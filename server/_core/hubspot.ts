import { request } from "http";

export type HubspotLeadContext = {
  fullName: string;
  email: string;
  phone?: string | undefined;
  preferredCourse?: string | undefined;
  message?: string | undefined;
  intakeYear?: number | undefined;
};

const HUBSPOT_PAT = process.env.HUBSPOT_ACCESS_TOKEN;

const PIPELINE_ID = process.env.HUBSPOT_DEAL_PIPELINE_ID || "default";

const STAGE_NEW_LEAD_ID = process.env.HUBSPOT_DEAL_STAGE_NEW_LEAD_ID;
const STAGE_COUNSELLING_SCHEDULED_ID = process.env.HUBSPOT_DEAL_STAGE_COUNSELLING_SCHEDULED_ID;

const stageIdForContext = (context: { routeKey: "contact" | "premium-home-form" | "book-consultation" }) => {
  if (context.routeKey === "book-consultation") return STAGE_COUNSELLING_SCHEDULED_ID;
  return STAGE_NEW_LEAD_ID;
};

const HUBSPOT_BASE = "https://api.hubapi.com";

function safeLogHubspotError(err: unknown, message: string) {
  // HubSpot failures must never break form submissions.
  // Log only HubSpot errors.
  console.error(`[HubSpot] ${message}`, err);
}

async function hubspotFetch<T>(path: string, init: RequestInit): Promise<T | null> {
  if (!HUBSPOT_PAT) {
    return null;
  }

  try {
    const res = await fetch(`${HUBSPOT_BASE}${path}`, {
      ...init,
      headers: {
        ...(init.headers || {}),
        Authorization: `Bearer ${HUBSPOT_PAT}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      safeLogHubspotError({ status: res.status, text }, `Request failed: ${path}`);
      return null;
    }

    return (await res.json()) as T;
  } catch (err) {
    safeLogHubspotError(err, `Network error: ${path}`);
    return null;
  }
}

type HubspotContact = {
  id: string | number;
  properties?: Record<string, unknown>;
};

type SearchContactsResponse = {
  results: HubspotContact[];
};

async function findContactIdByEmail(email: string): Promise<string | null> {
  if (!email) return null;

  // HubSpot CRM search endpoint
  const body = {
    filterGroups: [
      {
        filters: [
          {
            propertyName: "email",
            operator: "EQ",
            value: email,
          },
        ],
      },
    ],
    sorts: [{ propertyName: "createdate", direction: "DESC" }],
    limit: 1,
    after: 0,
  };

  const data = await hubspotFetch<SearchContactsResponse>(
    `/crm/v3/objects/contacts/search`,
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );

  const contact = data?.results?.[0];
  if (!contact?.id) return null;
  return String(contact.id);
}

async function upsertContactByEmail(input: HubspotLeadContext): Promise<string | null> {
  const existingId = await findContactIdByEmail(input.email);

  const properties: Record<string, unknown> = {
    email: input.email,
    firstname: input.fullName.split(" ")[0] || input.fullName,
    lastname:
      input.fullName.split(" ").slice(1).join(" ") || input.fullName.split(" ")[0] || "",
    phone: input.phone || "",
  };

  if (input.preferredCourse) properties["single_line_text__19"] = input.preferredCourse;
  if (input.intakeYear) properties["single_line_text__20"] = String(input.intakeYear);
  if (input.message) properties["notes"] = input.message;

  if (existingId) {
    await hubspotFetch(`/crm/v3/objects/contacts/${existingId}`, {
      method: "PATCH",
      body: JSON.stringify({ properties }),
    });
    return existingId;
  }

  const created = await hubspotFetch<{ id: string }>(`/crm/v3/objects/contacts`, {
    method: "POST",
    body: JSON.stringify({ properties }),
  });

  return created?.id ? String(created.id) : null;
}

type HubspotDealCreateResponse = { id: string };

async function createDealForContact(params: {
  contactId: string;
  stageId: string | undefined;
  lead: HubspotLeadContext;
}): Promise<string | null> {
  if (!params.stageId) return null;

  const dealProperties: Record<string, unknown> = {
    pipeline: PIPELINE_ID,
    dealstage: params.stageId,
    dealname: `${params.lead.fullName} - ${params.lead.preferredCourse || "Inquiry"}`,
  };

  const created = await hubspotFetch<HubspotDealCreateResponse>(`/crm/v3/objects/deals`, {
    method: "POST",
    body: JSON.stringify({ properties: dealProperties }),
  });

  return created?.id ? String(created.id) : null;
}

async function associateDealToContact(dealId: string, contactId: string): Promise<void> {
  // Association API
  // Deal to Contact association type can vary by account;
  // use the generic CRM association endpoint.
  await hubspotFetch(`/crm/v3/objects/deals/${dealId}/associations/contacts/${contactId}`, {
    method: "PUT",
    body: JSON.stringify({
      // associationType is not provided as requirement; HubSpot will infer in many accounts.
      // If it fails, we still swallow errors.
    }),
  });
}

export async function upsertContactAndCreateDeal(params: {
  routeKey: "contact" | "premium-home-form" | "book-consultation";
  lead: HubspotLeadContext;
}): Promise<void> {
  try {
    const contactId = await upsertContactByEmail(params.lead);
    if (!contactId) return;

    const stageId = stageIdForContext({ routeKey: params.routeKey });
    const dealId = await createDealForContact({ contactId, stageId, lead: params.lead });
    if (!dealId) return;

    await associateDealToContact(dealId, contactId);
  } catch (err) {
    safeLogHubspotError(err, "upsertContactAndCreateDeal failed");
  }
}

export async function upsertContactOnly(lead: HubspotLeadContext): Promise<void> {
  try {
    await upsertContactByEmail(lead);
  } catch (err) {
    safeLogHubspotError(err, "upsertContactOnly failed");
  }
}

