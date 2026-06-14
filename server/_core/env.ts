export const ENV = {
  // App
  appId:          process.env.VITE_APP_ID             ?? "",
  cookieSecret:   process.env.JWT_SECRET              ?? "",
  databaseUrl:    process.env.DATABASE_URL            ?? "",
  isProduction:   process.env.NODE_ENV === "production",
  port:           parseInt(process.env.PORT ?? "3000", 10),

  // Email / SMTP
  smtpHost:       process.env.SMTP_HOST               ?? "smtp.gmail.com",
  smtpPort:       parseInt(process.env.SMTP_PORT      ?? "587", 10),
  smtpUser:       process.env.SMTP_USER               ?? "",
  smtpPassword:   process.env.SMTP_PASSWORD           ?? "",
  adminEmail:     process.env.ADMIN_EMAIL             ?? "info@nawinsedutech.com",

  // HubSpot CRM
  hubspotApiKey:  process.env.HUBSPOT_API_KEY         ?? "",
  hubspotPipelineId:      process.env.HUBSPOT_DEAL_PIPELINE_ID              ?? "default",
  hubspotStageNewLead:    process.env.HUBSPOT_DEAL_STAGE_NEW_LEAD_ID        ?? "",
  hubspotStageCounselling:process.env.HUBSPOT_DEAL_STAGE_COUNSELLING_SCHEDULED_ID ?? "",

  // n8n Webhook (WhatsApp notifications via n8n + whapi.cloud)
  n8nWebhookUrl:  process.env.N8N_WEBHOOK_URL         ?? "",

  // Analytics
  gaId:           process.env.VITE_GOOGLE_ANALYTICS_ID ?? "",
  gtmId:          process.env.VITE_GTM_ID             ?? "",

  // Legacy (keep for SDK compatibility — not actively used)
  oAuthServerUrl: process.env.OAUTH_SERVER_URL        ?? "",
  ownerOpenId:    process.env.OWNER_OPEN_ID           ?? "",
  forgeApiUrl:    process.env.BUILT_IN_FORGE_API_URL  ?? "",
  forgeApiKey:    process.env.BUILT_IN_FORGE_API_KEY  ?? "",
};
