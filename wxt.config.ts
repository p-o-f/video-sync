import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    content_security_policy: {
      extension_pages:
        "script-src 'self' https://www.google-analytics.com/ https://apis.google.com/; object-src 'self'",
    },
  },
});
