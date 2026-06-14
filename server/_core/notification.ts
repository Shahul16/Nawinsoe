import { ENV } from "./env";

export type NotificationPayload = {
  title: string;
  content: string;
};

const TITLE_MAX_LENGTH = 1200;
const CONTENT_MAX_LENGTH = 20000;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const buildEndpointUrl = (baseUrl: string): string => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};

/**
 * FIXED: Removed all TRPCError usage.
 * TRPCError thrown inside a tRPC procedure propagates to tRPC's own error handler
 * even when wrapped in try/catch — causing every form submission to fail when
 * BUILT_IN_FORGE_API_URL is not configured.
 * Now returns false (no-op) when the service is not configured.
 */
export async function notifyOwner(
  payload: NotificationPayload
): Promise<boolean> {
  if (!isNonEmptyString(payload.title) || !isNonEmptyString(payload.content)) {
    console.warn("[Notification] Invalid payload — skipping");
    return false;
  }

  const title = payload.title.trim().slice(0, TITLE_MAX_LENGTH);
  const content = payload.content.trim().slice(0, CONTENT_MAX_LENGTH);

  if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
    console.warn("[Notification] BUILT_IN_FORGE_API_URL/KEY not configured — skipping");
    return false;
  }

  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(`[Notification] Failed (${response.status})${detail ? `: ${detail}` : ""}`);
      return false;
    }

    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}