import { createAuthClient } from "better-auth/vue";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "~~/server/utils/auth";

const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL!,
  plugins: [inferAdditionalFields<typeof auth>()],
});
export default authClient;
