import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self'",
    },
    permissions: ["identity", "offscreen", "storage"],
    // host_permissions: ["https://www.googleapis.com/"],
  },
});
