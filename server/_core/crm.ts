import axios from "axios";

type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  preferredCourse?: string;
  message?: string;
  intakeYear?: number;
};

const CRM_WEBHOOK = process.env.BUILT_IN_CRM_WEBHOOK || process.env.CRM_WEBHOOK_URL;

export async function sendLeadToCrm(lead: LeadPayload) {
  if (!CRM_WEBHOOK) {
    console.warn("CRM webhook is not configured; skipping CRM forwarding.");
    return false;
  }

  try {
    await axios.post(CRM_WEBHOOK, {
      source: "nawins-uk-site",
      timestamp: new Date().toISOString(),
      lead,
    });
    return true;
  } catch (err) {
    console.warn("Failed to forward lead to CRM:", err);
    return false;
  }
}

export default sendLeadToCrm;
