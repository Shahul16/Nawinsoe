export type HubspotLeadContext = {
  fullName: string;
  email: string;
  phone?: string | undefined;
  preferredCourse?: string | undefined;
  message?: string | undefined;
  intakeYear?: number | undefined;
};

// Lazy env getters — resolved at call-time, not module-load time
const getHubspotPat = () => process.env.HUBSPOT_ACCESS_TOKEN;
const getPipelineId = () => process.env.HUBSPOT_DEAL_PIPELINE_ID || "default";
const getStageNewLeadId = () => process.env.HUBSPOT_DEAL_STAGE_NEW_LEAD_ID;
const getStageCounsellingId = () => process.env.HUBSPOT_DEAL_STAGE_COUNSELLING_SCHEDULED_ID;

const stageIdForContext = (context: {
  routeKey: "contact" | "premium-home-form" | "book-consultation" | "careers";
}) => {
  if (context.routeKey === "book-consultation") return getStageCounsellingId();
  if (context.routeKey === "careers") return process.env.HUBSPOT_DEAL_STAGE_CAREERS_ID;
  return getStageNewLeadId();
};


const HUBSPOT_BASE = "https://api.hubapi.com";

function safeLogHubspotError(err: unknown, message: string) {
  console.error(`[HubSpot] ${message}`, err);
}

async function hubspotFetch<T>(path: string, init: RequestInit): Promise<T | null> {
  const HUBSPOT_PAT = getHubspotPat();
  if (!HUBSPOT_PAT) return null;

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
    // FIX 1: HubSpot search API requires "DESCENDING"/"ASCENDING", not "DESC"/"ASC"
    sorts: [{ propertyName: "createdate", direction: "DESCENDING" }],
    limit: 1,
    after: 0,
  };

  const data = await hubspotFetch<SearchContactsResponse>(
    `/crm/v3/objects/contacts/search`,
    { method: "POST", body: JSON.stringify(body) }
  );

  const contact = data?.results?.[0];
  if (!contact?.id) return null;
  return String(contact.id);
}

// FIX 2: Build contact properties using only standard HubSpot fields.
// "single_line_text__19" / "single_line_text__20" are auto-generated names that
// only exist in the portal where they were created. Map to standard properties instead.
function buildContactProperties(input: HubspotLeadContext): Record<string, unknown> {
  const properties: Record<string, unknown> = {
    email: input.email,
    firstname: input.fullName.split(" ")[0] || input.fullName,
    lastname:
      input.fullName.split(" ").slice(1).join(" ") ||
      input.fullName.split(" ")[0] ||
      "",
    phone: input.phone || "",
  };

  // Map to standard HubSpot contact properties
  if (input.preferredCourse) properties["jobtitle"] = input.preferredCourse;   // repurposed as course interest
  if (input.intakeYear) properties["hs_persona"] = `Intake ${input.intakeYear}`; // intake year as persona tag
  if (input.message) properties["message"] = input.message;                     // standard "message" property

  return properties;
}

async function upsertContactByEmail(input: HubspotLeadContext): Promise<string | null> {
  const existingId = await findContactIdByEmail(input.email);
  const properties = buildContactProperties(input);

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
    pipeline: getPipelineId(),
    dealstage: params.stageId,
    dealname: `${params.lead.fullName} - ${params.lead.preferredCourse || "Inquiry"}`,
  };

  const created = await hubspotFetch<HubspotDealCreateResponse>(
    `/crm/v3/objects/deals`,
    { method: "POST", body: JSON.stringify({ properties: dealProperties }) }
  );

  return created?.id ? String(created.id) : null;
}

async function associateDealToContact(dealId: string, contactId: string): Promise<void> {
  // Use CRM Associations v4 API — v3 PUT with empty body no longer works.
  // associationTypeId 3 = HUBSPOT_DEFINED Deal → Contact
  await hubspotFetch(
    `/crm/v4/objects/deals/${dealId}/associations/contacts/${contactId}`,
    {
      method: "PUT",
      body: JSON.stringify([
        { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 },
      ]),
    }
  );
}

function getStageIdForRouteKey(
  routeKey: "contact" | "premium-home-form" | "book-consultation" | "careers"
): string | undefined {
  return stageIdForContext({ routeKey });
}


function hubspotFail(message: string, err: unknown): never {
  safeLogHubspotError(err, message);
  if (err instanceof Error && err.message) throw new Error(err.message);
  throw new Error(message);
}

async function hubspotFetchOrThrow<T>(
  path: string,
  init: RequestInit,
  failMessage: string
): Promise<T> {
  const HUBSPOT_PAT = getHubspotPat();
  if (!HUBSPOT_PAT) throw new Error("HUBSPOT_ACCESS_TOKEN is not configured");

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
      let details = text;
      try {
        const parsed = JSON.parse(text);
        details = parsed?.message || parsed?.errors?.[0]?.message || text;
      } catch {
        // keep raw text
      }
      throw new Error(details || `${failMessage} (status ${res.status})`);
    }

    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message || failMessage);
    throw new Error(failMessage);
  }
}

// FIX 3: "Contact already exists" means findContactIdByEmail returned null
// (because the search sort was broken). After fixing sort direction (Fix 1) this
// won't normally happen, but as a safety net: parse the existing ID from the
// HubSpot error body and use it instead of failing the entire submission.
function extractExistingContactId(err: unknown): string | null {
  if (!(err instanceof Error)) return null;
  // HubSpot error message format: "Contact already exists. Existing ID: 795973891304"
  const match = err.message.match(/Existing ID[:\s]+(\d+)/i);
  return match?.[1] ?? null;
}

async function upsertContactByEmailOrThrow(input: HubspotLeadContext): Promise<string> {
  // FIX 1 applied: sort direction is now "DESCENDING" so this actually finds
  // existing contacts and takes the PATCH path instead of hitting POST conflicts.
  const existingId = await findContactIdByEmail(input.email);
  const properties = buildContactProperties(input);

  if (existingId) {
    await hubspotFetchOrThrow(
      `/crm/v3/objects/contacts/${existingId}`,
      { method: "PATCH", body: JSON.stringify({ properties }) },
      "Failed to update HubSpot contact"
    );
    return existingId;
  }

  try {
    const created = await hubspotFetchOrThrow<{ id: string }>(
      `/crm/v3/objects/contacts`,
      { method: "POST", body: JSON.stringify({ properties }) },
      "Failed to create HubSpot contact"
    );

    if (!created?.id) throw new Error("HubSpot contact creation returned no id");
    return String(created.id);

  } catch (err) {
    // FIX 3: If contact already exists (race condition or stale search result),
    // recover the existing ID from the error message and continue.
    const recoveredId = extractExistingContactId(err);
    if (recoveredId) {
      // Update the existing contact with latest data
      await hubspotFetchOrThrow(
        `/crm/v3/objects/contacts/${recoveredId}`,
        { method: "PATCH", body: JSON.stringify({ properties }) },
        "Failed to update existing HubSpot contact"
      );
      return recoveredId;
    }
    throw err;
  }
}

async function createDealForContactOrThrow(params: {
  contactId: string;
  stageId: string | undefined;
  lead: HubspotLeadContext;
}): Promise<string> {
  if (!params.stageId) throw new Error("HubSpot deal stage is not configured");

  const dealProperties: Record<string, unknown> = {
    pipeline: getPipelineId(),
    dealstage: params.stageId,
    dealname: `${params.lead.fullName} - ${params.lead.preferredCourse || "Inquiry"}`,
  };

  const created = await hubspotFetchOrThrow<{ id: string }>(
    `/crm/v3/objects/deals`,
    { method: "POST", body: JSON.stringify({ properties: dealProperties }) },
    "Failed to create HubSpot deal"
  );

  if (!created?.id) throw new Error("HubSpot deal creation returned no id");
  return String(created.id);
}

async function associateDealToContactOrThrow(
  dealId: string,
  contactId: string
): Promise<void> {
  await hubspotFetchOrThrow(
    `/crm/v4/objects/deals/${dealId}/associations/contacts/${contactId}`,
    {
      method: "PUT",
      body: JSON.stringify([
        { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 },
      ]),
    },
    "Failed to associate HubSpot deal with contact"
  );
}

export async function upsertContactAndCreateDeal(params: {
  routeKey: "contact" | "premium-home-form" | "book-consultation" | "careers";
  lead: HubspotLeadContext;
}): Promise<void> {

  try {
    const contactId = await upsertContactByEmail(params.lead);
    if (!contactId) return;

    const stageId = getStageIdForRouteKey(params.routeKey);
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

export async function submitContactUsToHubSpot(lead: HubspotLeadContext): Promise<void> {
  try {
    const contactId = await upsertContactByEmailOrThrow(lead);

    const stageId = getStageNewLeadId();
    const dealId = await createDealForContactOrThrow({ contactId, stageId, lead });

    await associateDealToContactOrThrow(dealId, contactId);
  } catch (err) {
    hubspotFail("HubSpot Contact Us submission failed", err);
  }
}
