import { createAuthClient } from "better-auth/vue";
const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL!,
});
export default authClient;
