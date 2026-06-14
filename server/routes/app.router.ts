import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "../_core/cookies";
import { systemRouter } from "../_core/systemRouter";

import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import {
  completeTaskById,
  createJobApplication,
  createNewsletterSubscription,
  createTask,
  getCourses,
  getJobApplications,
  getTasks,
  getTestimonials,
  getUniversities,
  getUniversityById,
  updateTaskStatus,
} from "../db";

import { submitContactUsToHubSpot, upsertContactAndCreateDeal, upsertContactOnly } from "../_core/hubspot";

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
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Valid email is required"),
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
        })
      )
      .mutation(async ({ input }) => {
        // ── 1. HubSpot CRM (best-effort, never breaks form) ──
        try {
          await submitContactUsToHubSpot({
            fullName: input.name,
            email: input.email,
            phone: input.phone,
            subject: input.subject,
            lead_source: input.lead_source,
            job_role: input.job_role,
            landing_page: input.landing_page,
            message: input.message,
            intakeYear: input.intakeYear,
            utm_source: input.utm_source,
            utm_medium: input.utm_medium,
            utm_campaign: input.utm_campaign,
          });
        } catch (err) {
          // FIX: was missing try/catch around submitContactUsToHubSpot which can throw
          console.error("[HubSpot] Contact Us submission failed (best-effort)", err);
        }

        // ── 2. Owner notification (best-effort, never breaks form) ──
        // FIX: notifyOwner throws TRPCError when BUILT_IN_FORGE_API_URL is missing.
        // This was silently propagating and crashing the mutation. Caught here safely.
        try {
          const { notifyOwner } = await import("../_core/notification");
          await notifyOwner({
            title: "New Student Inquiry",
            content: `New inquiry from ${input.name} (${input.email}) for ${input.subject || "General Inquiry"}`,
          });
        } catch (notifyError) {
          console.warn("[Notification] Failed to notify owner (non-fatal):", notifyError);
        }

        // ── 3. n8n Webhook → WhatsApp (best-effort, never breaks form) ──
        try {
          const n8nUrl = process.env.N8N_WEBHOOK_URL ?? "";
          if (n8nUrl) {
            fetch(n8nUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name:    input.name,
                email:   input.email,
                phone:   input.phone   || "Not provided",
                subject: input.subject || "General Inquiry",
                message: (input.message || "").slice(0, 300),
                source:  input.lead_source || "Website",
                time:    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
              }),
            }).catch(e => console.warn("[n8n] webhook failed:", e));
          }
        } catch (n8nErr) {
          console.warn("[n8n] Error:", n8nErr);
        }

        return { success: true } as const;
      }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email("Valid email is required"),
          name: z.string().optional(),
          interests: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // ── DB insert (best-effort — if DB is down, still return success) ──
        // FIX: was throwing raw DB errors to the client if mysql2 connection failed
        try {
          await createNewsletterSubscription({
            email: input.email,
            name: input.name,
            interests: input.interests,
          });
        } catch (dbError) {
          console.error("[DB] Newsletter subscription DB write failed (non-fatal):", dbError);
          // Don't rethrow — HubSpot below is the real source of truth
        }

        // ── HubSpot contact (best-effort) ──
        try {
          await upsertContactOnly({
            fullName: input.name || input.email,
            email: input.email,
          });
        } catch (hubspotErr) {
          console.error("[HubSpot] Newsletter forwarding failed", hubspotErr);
        }

        // ── Owner notification (best-effort) ──
        try {
          const { notifyOwner } = await import("../_core/notification");
          await notifyOwner({
            title: "New Newsletter Subscription",
            content: `New subscription from ${input.email}${input.name ? ` (${input.name})` : ""}`,
          });
        } catch (notifyError) {
          console.warn("[Notification] Failed to notify owner (non-fatal):", notifyError);
        }

        return { success: true };
      }),
  }),

  testimonials: router({
    list: publicProcedure.query(async () => await getTestimonials()),
  }),

  tasks: router({
    list: publicProcedure
      .input(z.object({ status: z.enum(["pending", "in_progress", "completed"]).optional() }).optional())
      .query(async ({ input }) => await getTasks(input?.status)),

    create: publicProcedure
      .input(z.object({
        title: z.string().min(1).max(180),
        description: z.string().max(1200).optional(),
      }))
      .mutation(async ({ input }) => {
        const task = await createTask({ title: input.title, description: input.description, status: "pending" });
        return { success: true, data: task };
      }),

    complete: publicProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        const task = await completeTaskById(input.id);
        if (!task) return { success: false, message: "Task not found" } as const;
        try {
          const { notifyOwner } = await import("../_core/notification");
          await notifyOwner({ title: "Task Completed", content: `Task completed: ${task.title}` });
        } catch { /* non-fatal */ }
        return { success: true, data: task } as const;
      }),

    updateStatus: publicProcedure
      .input(z.object({ id: z.number().int().positive(), status: z.enum(["pending", "in_progress", "completed"]) }))
      .mutation(async ({ input }) => {
        const task = await updateTaskStatus(input.id, input.status);
        if (!task) return { success: false, message: "Task not found" } as const;
        if (input.status === "completed") {
          try {
            const { notifyOwner } = await import("../_core/notification");
            await notifyOwner({ title: "Task Completed", content: `Task completed: ${task.title}` });
          } catch { /* non-fatal */ }
        }
        return { success: true, data: task } as const;
      }),
  }),

  jobApplications: router({
    create: publicProcedure
      .input(z.object({
        fullName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        city: z.string().optional(),
        experience: z.string().optional(),
        position: z.string().min(1),
        resumeFile: z.string().optional(),
        coverLetter: z.string().optional(),
        utm_source: z.string().optional(),
        utm_medium: z.string().optional(),
        utm_campaign: z.string().optional(),
        landing_page: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // ── DB insert (best-effort) ──
        // FIX: was throwing raw DB errors. Now non-fatal so HubSpot still receives it.
        try {
          await createJobApplication({
            fullName: input.fullName,
            email: input.email,
            phone: input.phone,
            city: input.city,
            experience: input.experience,
            position: input.position,
            resumeFile: input.resumeFile,
            coverLetter: input.coverLetter,
          });
        } catch (dbError) {
          console.error("[DB] Job application DB write failed (non-fatal):", dbError);
        }

        // ── HubSpot (best-effort) ──
        try {
          await upsertContactAndCreateDeal({
            routeKey: "careers",
            lead: {
              fullName: input.fullName,
              email: input.email,
              phone: input.phone,
              subject: input.position,
              lead_source: "careers",
              job_role: input.position,
              message: input.coverLetter,
              utm_source: input.utm_source,
              utm_medium: input.utm_medium,
              utm_campaign: input.utm_campaign,
              landing_page: input.landing_page,
            },
          });
        } catch (hubspotErr) {
          console.error("[HubSpot] Careers forwarding failed (non-fatal)", hubspotErr);
        }

        // ── Email notification (best-effort) ──
        try {
          const { sendCareersNotificationEmail } = await import("../_core/email");
          await sendCareersNotificationEmail({
            to: ["careers@nawinsedutech.com"],
            fullName: input.fullName,
            email: input.email,
            phone: input.phone,
            city: input.city,
            position: input.position,
            experience: input.experience,
            coverLetter: input.coverLetter,
            resumeFile: input.resumeFile,
          });
        } catch (emailErr) {
          console.error("[Email] Careers notification failed (non-fatal)", emailErr);
        }

        // ── Owner notification (best-effort) ──
        try {
          const { notifyOwner } = await import("../_core/notification");
          await notifyOwner({
            title: "New Job Application",
            content: `New application from ${input.fullName} (${input.email}) for ${input.position}`,
          });
        } catch { /* non-fatal */ }

        return { success: true } as const;
      }),
  }),

  admin: router({
    jobApplications: publicProcedure
      .input(z.object({
        position: z.string().optional(),
        status: z.enum(["New", "Reviewing", "Interview Scheduled", "Selected", "Rejected"]).optional(),
      }).optional())
      .query(async ({ input }) => await getJobApplications(input)),
  }),
});

export type AppRouter = typeof appRouter;
