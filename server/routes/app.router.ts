import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "../_core/cookies";
import { systemRouter } from "../_core/systemRouter";
import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import {
  completeTaskById,
  createInquiry,
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
import { sendLeadToCrm } from "../_core/crm";
import { upsertContactAndCreateDeal, upsertContactOnly } from "../_core/hubspot";


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
          preferredCourse: z.string().optional(),
          message: z.string().max(2000).optional(),
          intakeYear: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const result = await createInquiry({
            name: input.name,
            email: input.email,
            phone: input.phone,
            preferredCourse: input.preferredCourse,
            message: input.message,
            intakeYear: input.intakeYear,
          });

          // Owner notification should not block the user flow.
          try {
            await notifyOwner({
              title: "New Student Inquiry",
              content: `New inquiry from ${input.name} (${input.email}) for ${input.preferredCourse || "General Inquiry"}`,
            });
          } catch (notifyError) {
            console.warn("Failed to notify owner for inquiry:", notifyError);
          }

          // HubSpot forwarding must never break form submission.
          try {
            const routeKey: "contact" | "premium-home-form" | "book-consultation" =
              input.preferredCourse === "Consultation Booking" ? "book-consultation" : input.preferredCourse === "Premium Home Form" ? "premium-home-form" : "contact";

            await upsertContactAndCreateDeal({
              routeKey,
              lead: {
                fullName: input.name,
                email: input.email,
                phone: input.phone,
                preferredCourse: input.preferredCourse,
                message: input.message,
                intakeYear: input.intakeYear,
              },
            });
          } catch (hubspotErr) {
            console.error("[HubSpot] Inquiry forwarding failed", hubspotErr);
          }

          return { success: true, data: result };

        } catch (error) {
          // If DB is unavailable, forward the lead to CRM/email webhook if configured.
          console.warn("Failed to create inquiry in DB, attempting CRM/email fallback:", error);

          try {
            const forwarded = await sendLeadToCrm({
              name: input.name,
              email: input.email,
              phone: input.phone,
              preferredCourse: input.preferredCourse,
              message: input.message,
              intakeYear: input.intakeYear,
            });

            try {
              await notifyOwner({
                title: "New Student Inquiry (Fallback)",
                content: `Received inquiry (CRM fallback) from ${input.name} (${input.email}) for ${input.preferredCourse || "General Inquiry"}`,
              });
            } catch (notifyError) {
              console.warn("Failed to notify owner for inquiry (fallback):", notifyError);
            }

            return { success: true, forwarded }; 
          } catch (fallbackErr) {
            console.error("CRM/email fallback failed:", fallbackErr);
            throw fallbackErr;
          }
        }
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

           // HubSpot contact-only must never break application submission.
           try {
             await upsertContactOnly({
               fullName: input.fullName,
               email: input.email,
               phone: input.phone,
               preferredCourse: input.position,
               message: input.coverLetter,
             });
           } catch (hubspotErr) {
             console.error("[HubSpot] Careers forwarding failed", hubspotErr);
           }

           // Email sending (SMTP via server/_core/email.ts)
           // Failures must never break the application submission.
           try {
             // Lazy-load to avoid importing nodemailer in environments that don't need it.
             const { sendCareersNotificationEmail } = await import("../_core/email");
             await sendCareersNotificationEmail({
               to: ["careers@nawinsedutech.com", "info@nawinsedutech.com"],
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
