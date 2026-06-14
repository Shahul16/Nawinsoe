import { describe, expect, it } from "vitest";
import { appRouter } from "./routes/app.router";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("inquiries.create", () => {
  it("should create an inquiry with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.inquiries.create({
      name: "John Doe",
      email: "john@example.com",
      phone: "+44 123 456 7890",
      preferredCourse: "Computer Science",
      message: "Need guidance on September intake.",
      intakeYear: 2026,
    });

    expect(result.success).toBe(true);
  });

  it("should reject inquiry without name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.inquiries.create({
        name: "",
        email: "john@example.com",
        phone: "+44 123 456 7890",
        preferredCourse: "Computer Science",
        intakeYear: 2026,
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should reject inquiry without email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.inquiries.create({
        name: "John Doe",
        email: "invalid-email",
        phone: "+44 123 456 7890",
        preferredCourse: "Computer Science",
        intakeYear: 2026,
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe("universities.list", () => {
  it("should return a list of universities", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.universities.list();

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("testimonials.list", () => {
  it("should return a list of testimonials", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.testimonials.list();

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("courses.list", () => {
  it("should return a list of courses", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.courses.list();

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("tasks", () => {
  it("should create a task", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.tasks.create({
      title: "Prepare SOP draft",
      description: "First draft for UK application",
    });

    expect(result.success).toBe(true);
  });

  it("should list tasks", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.tasks.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should return false when completing a non-existing task", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.tasks.complete({ id: 999999 });
    expect(result.success).toBe(false);
  });

  it("should return false when updating status for non-existing task", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.tasks.updateStatus({
      id: 999999,
      status: "in_progress",
    });
    expect(result.success).toBe(false);
  });
});
