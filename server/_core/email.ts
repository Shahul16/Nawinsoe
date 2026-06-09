// nodemailer is intentionally loaded dynamically to avoid hard dependency
// (this repo may not include nodemailer in dependencies).


export type SendCareersNotificationEmailInput = {
  to: string[];
  fullName: string;
  email: string;
  phone?: string | null;
  city?: string | null;
  position: string;
  experience?: string | null;
  coverLetter?: string | null;
  resumeFile?: string | null;
};

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT_RAW = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

const ADMIN_FROM = process.env.ADMIN_EMAIL || SMTP_USER;

function safeLogEmailError(err: unknown, context: string) {
  // Email failures must never break submission.
  // Log errors only.
  console.error(`[Email] ${context}`, err);
}

function isReady(): boolean {
  return !!(
    SMTP_HOST &&
    SMTP_PORT_RAW &&
    SMTP_USER &&
    SMTP_PASSWORD
  );
}

function getPort(): number {
  const port = Number(SMTP_PORT_RAW);
  return Number.isFinite(port) ? port : 587;
}

function buildCareersSubject(position: string, fullName: string) {
  return `New Career Application - ${position} - ${fullName}`;
}

function buildCareersBody(input: SendCareersNotificationEmailInput) {
  const submittedAt = new Date().toISOString();

  return [
    "New Career Application Received",
    "",
    `Name: ${input.fullName}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || ""}`,
    `City: ${input.city || ""}`,
    `Position: ${input.position}`,
    `Experience: ${input.experience || ""}`,
    "",
    `Cover Letter:`,
    `${input.coverLetter || ""}`,
    "",
    `Resume: ${input.resumeFile || ""}`,
    "",
    `Submitted At: ${submittedAt}`,
  ].join("\n");
}

export async function sendCareersNotificationEmail(
  input: SendCareersNotificationEmailInput
): Promise<void> {
  try {
    if (!isReady()) {
      // Failures must never break the request.
      safeLogEmailError(
        {
          reason: "SMTP not configured",
          missing: {
            SMTP_HOST: !!SMTP_HOST,
            SMTP_PORT: !!SMTP_PORT_RAW,
            SMTP_USER: !!SMTP_USER,
            SMTP_PASSWORD: !!SMTP_PASSWORD,
          },
        },
        "SMTP not configured; skipping careers email"
      );
      return;
    }

    // Use dynamic import without type resolution (TS may not have nodemailer types).
    const nodemailer = (await import("nodemailer")) as any;


    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: getPort(),
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });


    const subject = buildCareersSubject(input.position, input.fullName);
    const text = buildCareersBody(input);

    await transporter.sendMail({
      from: ADMIN_FROM,
      to: input.to.join(","),
      subject,
      text,
      // Resume attachment is not available as a file buffer in current backend inputs
      // (resumeFile is a string). Intentionally not attaching to avoid incorrect behavior.
    });
  } catch (err) {
    safeLogEmailError(err, "sendCareersNotificationEmail failed");
  }
}

