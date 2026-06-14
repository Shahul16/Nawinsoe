import { createApp } from "../server/_core/createApp.js";
import type { IncomingMessage, ServerResponse } from "http";

let appPromise: Promise<import("express").Express> | null = null;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!appPromise) {
    appPromise = createApp();
  }

  const app = await appPromise;
  return app(req, res);
}

