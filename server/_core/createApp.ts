import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth.js";
import { registerStorageProxy } from "./storageProxy.js";
import { appRouter } from "../routes/app.router.js";
import { createContext } from "./context.js";

export async function createApp() {
  const app = express();

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Only register the storage proxy if the built-in storage backend is configured.
  // Otherwise allow express.static to serve local `/nawins-storage` files from the public folder.
  const { ENV } = await import("./env.js");
  if (ENV.forgeApiUrl && ENV.forgeApiKey) {
    registerStorageProxy(app);
  }

  registerOAuthRoutes(app);

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // NOTE: static serving / Vite integration intentionally omitted.
  // Vercel serves static assets separately; local dev uses server/_core/index.ts.

  return app;
}

