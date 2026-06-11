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
import { notifyOwner } from "../_core/notification";

import { submitContactUsToHubSpot, upsertContactAndCreateDeal, upsertContactOnly } from "../_core/hubspot";





export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  universities: router({
    list: publicProcedure.query(async () => {
      return await getUniversities();
    }),
    getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      return await getUniversityById(input.id);
    }),
  }),

  courses: router({
    list: publicProcedure.query(async () => {
      return await getCourses();
    }),
  }),

  inquiries: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Valid email is required"),
          phone: z.string().optional(),

          // Primary inquiry subject (student inquiry OR career application)
          subject: z.string().optional(),

          // Lead source tracking for reporting
          lead_source: z.string().optional(),
          job_role: z.string().optional(),
          landing_page: z.string().optional(),

          // Optional message + intake
          message: z.string().max(2000).optional(),
          intakeYear: z.number().optional(),

          // UTM tracking (HubSpot contact properties)
          utm_source: z.string().optional(),
          utm_medium: z.string().optional(),
          utm_campaign: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // Contact Us flow: HubSpot is the primary destination.
        // No database dependency and no CRM/email fallback.
        // Best-effort HubSpot submission: if HubSpot isn't configured,
        // submission must still succeed (important for local/dev + tests).
        try {
          await submitContactUsToHubSpot({
            fullName: input.name,
            email: input.email,
            phone: input.phone,

            // Store inquiry subject as primary reporting field
            subject: input.subject,

            // Reporting fields
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
          console.error("[HubSpot] Contact Us submission failed (best-effort)", err);
        }

        // Owner notification is best-effort and must never break submission.
        try {
          await notifyOwner({
            title: "New Student Inquiry",
            content: `New inquiry from ${input.name} (${input.email}) for ${input.subject || "General Inquiry"}`,
          });
        } catch (notifyError) {
          console.warn("Failed to notify owner for inquiry:", notifyError);
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
        try {
          const result = await createNewsletterSubscription({
            email: input.email,
            name: input.name,
            interests: input.interests,
          });

          try {
            await notifyOwner({
              title: "New Newsletter Subscription",
              content: `New subscription from ${input.email}${input.name ? ` (${input.name})` : ""}`,
            });
          } catch (notifyError) {
            console.warn("Failed to notify owner for newsletter subscription:", notifyError);
          }

          // HubSpot contact-only must never break form submission.
          try {
            await upsertContactOnly({
              fullName: input.name || input.email,
              email: input.email,
            });
          } catch (hubspotErr) {
            console.error("[HubSpot] Newsletter forwarding failed", hubspotErr);
          }

          return { success: true, data: result };

        } catch (error) {
          console.error("Failed to create newsletter subscription:", error);
          throw error;
        }
      }),
  }),

  testimonials: router({
    list: publicProcedure.query(async () => {
      return await getTestimonials();
    }),
  }),

tasks: router({
     list: publicProcedure
       .input(
         z
           .object({
             status: z.enum(["pending", "in_progress", "completed"]).optional(),
           })
           .optional()
       )
       .query(async ({ input }) => {
         return await getTasks(input?.status);
       }),

     create: publicProcedure
       .input(
         z.object({
           title: z
             .string()
             .min(1, "Task title is required")
             .max(180, "Task title must be 180 characters or less"),
           description: z.string().max(1200).optional(),
         })
       )
       .mutation(async ({ input }) => {
         const task = await createTask({
           title: input.title,
           description: input.description,
           status: "pending",
         });

         return { success: true, data: task };
       }),

     complete: publicProcedure
       .input(
         z.object({
           id: z.number().int().positive(),
         })
       )
       .mutation(async ({ input }) => {
         const task = await completeTaskById(input.id);
         if (!task) {
           return { success: false, message: "Task not found" } as const;
         }

         try {
           await notifyOwner({
             title: "Task Completed",
             content: `Task completed: ${task.title}`,
           });
         } catch (notifyError) {
           console.warn("Failed to notify owner for completed task:", notifyError);
         }

         return { success: true, data: task } as const;
       }),

     updateStatus: publicProcedure
       .input(
         z.object({
           id: z.number().int().positive(),
           status: z.enum(["pending", "in_progress", "completed"]),
         })
       )
       .mutation(async ({ input }) => {
         const task = await updateTaskStatus(input.id, input.status);
         if (!task) {
           return { success: false, message: "Task not found" } as const;
         }

         if (input.status === "completed") {
           try {
             await notifyOwner({
               title: "Task Completed",
               content: `Task completed: ${task.title}`,
             });
           } catch (notifyError) {
             console.warn("Failed to notify owner for completed task:", notifyError);
           }
         }

         return { success: true, data: task } as const;
       }),
   }),

  jobApplications: router({
     create: publicProcedure
       .input(
         z.object({
           fullName: z.string().min(1, "Full name is required"),
           email: z.string().email("Valid email is required"),
           phone: z.string().optional(),
           city: z.string().optional(),
           experience: z.string().optional(),
           position: z.string().min(1, "Position is required"),
           resumeFile: z.string().optional(),
           coverLetter: z.string().optional(),

           // Lead source tracking (HubSpot contact properties)
           utm_source: z.string().optional(),
           utm_medium: z.string().optional(),
           utm_campaign: z.string().optional(),
           landing_page: z.string().optional(),
         })
       )
       .mutation(async ({ input }) => {
         try {
           const result = await createJobApplication({
             fullName: input.fullName,
             email: input.email,
             phone: input.phone,
             city: input.city,
             experience: input.experience,
             position: input.position,
             resumeFile: input.resumeFile,
             coverLetter: input.coverLetter,
           });

           try {
             await notifyOwner({
               title: "New Job Application",
               content: `New application from ${input.fullName} (${input.email}) for ${input.position}`,
             });
           } catch (notifyError) {
             console.warn("Failed to notify owner for job application:", notifyError);
           }

          // HubSpot lead + deal for careers (best-effort).
          try {
            await upsertContactAndCreateDeal({
              routeKey: "careers",
              lead: {
                fullName: input.fullName,
                email: input.email,
                phone: input.phone,

                // Primary inquiry subject for CRM reporting
                subject: input.position,

                // Reporting fields for separating careers vs student enquiries
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
            console.error("[HubSpot] Careers forwarding failed (best-effort)", hubspotErr);
          }

          // Email sending (SMTP via server/_core/email.ts)
          // Failures must never break the application submission.
          try {
            // Lazy-load to avoid importing nodemailer in environments that don't need it.
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
            console.error("[Email] Careers notification failed", emailErr);
          }

           return { success: true, data: result } as const;

         } catch (error) {
           console.error("Failed to create job application:", error);
           throw error;
         }
       }),
   }),

   admin: router({
     jobApplications: publicProcedure
       .input(
         z
           .object({
             position: z.string().optional(),
             status: z.enum(["New", "Reviewing", "Interview Scheduled", "Selected", "Rejected"]).optional(),
           })
           .optional()
       )
       .query(async ({ input }) => {
         return await getJobApplications(input);
       }),
   }),
});

export type AppRouter = typeof appRouter;
