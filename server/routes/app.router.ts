import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "../_core/cookies";
import { systemRouter } from "../_core/systemRouter";
import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import {
  completeTaskById, createJobApplication, createNewsletterSubscription,
  createTask, getCourses, getJobApplications, getTasks,
  getTestimonials, getUniversities, getUniversityById, updateTaskStatus,
} from "../db";
import { upsertContactAndCreateDeal, upsertContactOnly } from "../_core/hubspot";
 
export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  universities: router({
    list: publicProcedure.query(async () => await getUniversities()),
    getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => await getUniversityById(input.id)),
  }),
  courses: router({
    list: publicProcedure.query(async () => await getCourses()),
  }),
 
  inquiries: router({
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().optional(),
        lead_source: z.string().optional(),
        job_role: z.string().optional(),
        landing_page: z.string().optional(),
        message: z.string().max(2000).optional(),
        intakeYear: z.number().optional(),
        utm_source: z.string().optional(),
        utm_medium: z.string().optional(),
        utm_campaign: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Direct HubSpot fetch — no imported helper, no TRPCError risk
        try {
          const PAT = process.env.HUBSPOT_ACCESS_TOKEN;
          if (PAT) {
            const base = "https://api.hubapi.com";
            const h = { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" };
            const props = {
              email: input.email,
              firstname: input.name.split(" ")[0] || input.name,
              lastname: input.name.split(" ").slice(1).join(" ") || "",
              phone: input.phone || "",
              message: input.message || "",
            };
            // Search existing contact
            const sr = await fetch(`${base}/crm/v3/objects/contacts/search`, {
              method: "POST", headers: h,
              body: JSON.stringify({ filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: input.email }] }], limit: 1 }),
            });
            const sd = await sr.json() as any;
            let cid: string | null = sd?.results?.[0]?.id ?? null;
            if (cid) {
              await fetch(`${base}/crm/v3/objects/contacts/${cid}`, { method: "PATCH", headers: h, body: JSON.stringify({ properties: props }) });
            } else {
              const cr = await fetch(`${base}/crm/v3/objects/contacts`, { method: "POST", headers: h, body: JSON.stringify({ properties: props }) });
              const cd = await cr.json() as any;
              cid = cd?.id ?? null;
            }
            const stageId = process.env.HUBSPOT_DEAL_STAGE_NEW_LEAD_ID;
            if (cid && stageId) {
              const dr = await fetch(`${base}/crm/v3/objects/deals`, {
                method: "POST", headers: h,
                body: JSON.stringify({ properties: { dealname: `${input.name} - ${input.subject || "Inquiry"}`, dealstage: stageId, pipeline: process.env.HUBSPOT_DEAL_PIPELINE_ID || "default" } }),
              });
              const dd = await dr.json() as any;
              if (dd?.id) {
                await fetch(`${base}/crm/v4/objects/deals/${dd.id}/associations/contacts/${cid}`, {
                  method: "PUT", headers: h,
                  body: JSON.stringify([{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }]),
                });
              }
            }
          }
        } catch (e) { console.error("[HubSpot] non-fatal:", e); }
 
        // WhatsApp via n8n (fire and forget)
        try {
          const n8nUrl = process.env.N8N_WEBHOOK_URL;
          if (n8nUrl) {
            fetch(n8nUrl, {
              method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: input.name, email: input.email, phone: input.phone || "Not provided", subject: input.subject || "General Inquiry", message: (input.message || "").slice(0, 300), source: input.lead_source || "Website", time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) }),
            }).catch(e => console.warn("[n8n]:", e));
          }
        } catch { /* non-fatal */ }
 
        return { success: true } as const;
      }),
  }),
 
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({ email: z.string().email(), name: z.string().optional(), interests: z.string().optional() }))
      .mutation(async ({ input }) => {
        try { await createNewsletterSubscription({ email: input.email, name: input.name, interests: input.interests }); } catch (e) { console.error("[DB]:", e); }
        try { await upsertContactOnly({ fullName: input.name || input.email, email: input.email }); } catch (e) { console.error("[HubSpot]:", e); }
        return { success: true };
      }),
  }),
 
  testimonials: router({
    list: publicProcedure.query(async () => await getTestimonials()),
  }),
 
  tasks: router({
    list: publicProcedure.input(z.object({ status: z.enum(["pending", "in_progress", "completed"]).optional() }).optional()).query(async ({ input }) => await getTasks(input?.status)),
    create: publicProcedure.input(z.object({ title: z.string().min(1).max(180), description: z.string().max(1200).optional() })).mutation(async ({ input }) => ({ success: true, data: await createTask({ title: input.title, description: input.description, status: "pending" }) })),
    complete: publicProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ input }) => { const t = await completeTaskById(input.id); return t ? { success: true, data: t } as const : { success: false, message: "Task not found" } as const; }),
    updateStatus: publicProcedure.input(z.object({ id: z.number().int().positive(), status: z.enum(["pending", "in_progress", "completed"]) })).mutation(async ({ input }) => { const t = await updateTaskStatus(input.id, input.status); return t ? { success: true, data: t } as const : { success: false, message: "Task not found" } as const; }),
  }),
 
  jobApplications: router({
    create: publicProcedure
      .input(z.object({ fullName: z.string().min(1), email: z.string().email(), phone: z.string().optional(), city: z.string().optional(), experience: z.string().optional(), position: z.string().min(1), resumeFile: z.string().optional(), coverLetter: z.string().optional(), utm_source: z.string().optional(), utm_medium: z.string().optional(), utm_campaign: z.string().optional(), landing_page: z.string().optional() }))
      .mutation(async ({ input }) => {
        try { await createJobApplication({ fullName: input.fullName, email: input.email, phone: input.phone, city: input.city, experience: input.experience, position: input.position, resumeFile: input.resumeFile, coverLetter: input.coverLetter }); } catch (e) { console.error("[DB]:", e); }
        try { await upsertContactAndCreateDeal({ routeKey: "careers", lead: { fullName: input.fullName, email: input.email, phone: input.phone, subject: input.position, lead_source: "careers", job_role: input.position, message: input.coverLetter, utm_source: input.utm_source, utm_medium: input.utm_medium, utm_campaign: input.utm_campaign, landing_page: input.landing_page } }); } catch (e) { console.error("[HubSpot]:", e); }
        try { const { sendCareersNotificationEmail } = await import("../_core/email"); await sendCareersNotificationEmail({ to: ["careers@nawinsedutech.com"], fullName: input.fullName, email: input.email, phone: input.phone, city: input.city, position: input.position, experience: input.experience, coverLetter: input.coverLetter }); } catch (e) { console.error("[Email]:", e); }
        return { success: true } as const;
      }),
  }),
 
  admin: router({
    jobApplications: publicProcedure.input(z.object({ position: z.string().optional(), status: z.enum(["New", "Reviewing", "Interview Scheduled", "Selected", "Rejected"]).optional() }).optional()).query(async ({ input }) => await getJobApplications(input)),
  }),
});
 
export type AppRouter = typeof appRouter;
 