// Centralized configuration. Read environment variables here so the rest of
// the app never touches `process.env` directly. Add future API keys / base
// URLs as additional fields below.
export const config = {
  port: Number(process.env.PORT) || 3000,
  azureMapsKey: process.env.AZURE_MAPS_KEY || '',
};
