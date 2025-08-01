import { Container, getContainer } from "@cloudflare/containers";
import { Hono } from "hono";

export class OAuth2ProxyContainer extends Container<Env> {
  // OAuth2 Proxy runs on port 8080 by default
  defaultPort = 4180;
  // Sleep after 30 seconds of inactivity.
  sleepAfter = "30s";
  
  // Environment variables for oauth2-proxy
  // These will be set directly in Cloudflare Dashboard as container environment variables
  envVars = {
    // OAuth2 Proxy will read these standard environment variables
    OAUTH2_PROXY_CLIENT_ID: this.env.OAUTH2_PROXY_CLIENT_ID || "",
    OAUTH2_PROXY_CLIENT_SECRET: this.env.OAUTH2_PROXY_CLIENT_SECRET || "",
    OAUTH2_PROXY_COOKIE_SECRET: this.env.OAUTH2_PROXY_COOKIE_SECRET || "",
    OAUTH2_PROXY_REQUEST_LOGGING: "false",
    OAUTH2_PROXY_STANDARD_LOGGING: "false",
    OAUTH2_PROXY_AUTH_LOGGING: "false",
    
    // Static configuration from config.cfg will be used for other settings
    // These env vars override the config file when set
  };

  // Lifecycle hooks 
  override onStart() {
    console.log("OAuth2 Proxy started");
  }

  override onStop() {
    console.log("OAuth2 Proxy stopped");
  }

  override onError(error: unknown) {
    console.error("OAuth2 Proxy error:", error);
  }
}

// Create Hono app for routing
const app = new Hono<{
  Bindings: Env;
}>();

// Main route - proxy all requests to oauth2-proxy container
app.all("*", async (c) => {
  // Use singleton pattern for oauth2-proxy (single instance for minimum cost)
  const container = getContainer(c.env.OAUTH2_PROXY);
  return await container.fetch(c.req.raw);
});

export default app;