import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertInquiry,
  InsertTask,
  InsertUser,
  Task,
  courses,
  inquiries,
  jobApplications,
  newsletterSubscribers,
  tasks,
  testimonials,
  universities,
  users,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUniversities() {
  const db = await getDb();
  if (!db) return [];
  try {
    const result = await db.select().from(universities);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get universities:", error);
    return [];
  }
}

export async function getUniversityById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  try {
    const result = await db.select().from(universities).where(eq(universities.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get university:", error);
    return undefined;
  }
}

export async function getCourses() {
  const db = await getDb();
  if (!db) return [];
  try {
    const result = await db.select().from(courses);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get courses:", error);
    return [];
  }
}

export async function createInquiry(data: InsertInquiry) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create inquiry: database not available");
    return null;
  }
  try {
    const result = await db.insert(inquiries).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create inquiry:", error);
    throw error;
  }
}

export async function getTestimonials() {
  const db = await getDb();
  if (!db) return [];
  try {
    const result = await db.select().from(testimonials);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get testimonials:", error);
    return [];
  }
}

export async function getTasks(status?: Task["status"]) {
  const db = await getDb();
  if (!db) return [];
  try {
    if (status) {
      return await db
        .select()
        .from(tasks)
        .where(eq(tasks.status, status))
        .orderBy(desc(tasks.createdAt));
    }

    return await db.select().from(tasks).orderBy(desc(tasks.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get tasks:", error);
    return [];
  }
}

export async function createTask(data: InsertTask) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create task: database not available");
    return null;
  }

  try {
    const inserted = await db.insert(tasks).values(data).$returningId();
    const taskId = inserted[0]?.id;
    if (!taskId) return null;

    const rows = await db.select().from(tasks).where(eq(tasks.id, taskId)).limit(1);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create task:", error);
    throw error;
  }
}

export async function completeTaskById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot complete task: database not available");
    return null;
  }

  try {
    const existingRows = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
    if (existingRows.length === 0) return null;

    await db
      .update(tasks)
      .set({ status: "completed", completedAt: new Date() })
      .where(eq(tasks.id, id));

    const rows = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("[Database] Failed to complete task:", error);
    throw error;
  }
}

export async function updateTaskStatus(
  id: number,
  status: Task["status"]
) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update task status: database not available");
    return null;
  }

  try {
    const existingRows = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
    if (existingRows.length === 0) return null;

    await db
      .update(tasks)
      .set({
        status,
        completedAt: status === "completed" ? new Date() : null,
      })
      .where(eq(tasks.id, id));

    const rows = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("[Database] Failed to update task status:", error);
    throw error;
  }
}

export async function createNewsletterSubscription(data: { email: string; name?: string | null; interests?: string | null }) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create newsletter subscription: database not available");
    return null;
  }
  try {
    const result = await db.insert(newsletterSubscribers).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create newsletter subscription:", error);
    throw error;
  }
}

export async function createJobApplication(data: {
  fullName: string;
  email: string;
  phone?: string | null;
  city?: string | null;
  experience?: string | null;
  position: string;
  resumeFile?: string | null;
  coverLetter?: string | null;
}) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create job application: database not available");
    return null;
  }
  try {
    const inserted = await db.insert(jobApplications).values({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      city: data.city,
      experience: data.experience,
      position: data.position,
      resumeFile: data.resumeFile,
      coverLetter: data.coverLetter,
    }).$returningId();
    const appId = inserted[0]?.id;
    if (!appId) return null;
    const rows = await db.select().from(jobApplications).where(eq(jobApplications.id, appId)).limit(1);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create job application:", error);
    throw error;
  }
}

export async function getJobApplications(filters?: { position?: string; status?: string }) {
  const db = await getDb();
  if (!db) return [];
  try {
    if (filters?.position && filters?.status) {
      return await db.select().from(jobApplications)
        .where(eq(jobApplications.position, filters.position))
        .orderBy(desc(jobApplications.createdAt));
    }
    if (filters?.position) {
      return await db.select().from(jobApplications)
        .where(eq(jobApplications.position, filters.position))
        .orderBy(desc(jobApplications.createdAt));
    }
    if (filters?.status) {
      return await db.select().from(jobApplications)
        .where(eq(jobApplications.status, filters.status as any))
        .orderBy(desc(jobApplications.createdAt));
    }
    return await db.select().from(jobApplications).orderBy(desc(jobApplications.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get job applications:", error);
    return [];
  }
}
