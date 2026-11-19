import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../utils/drizzle";
import * as schema from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  user: {
    additionalFields: {
      phone: {
        type: "string",
        input: false,
        required: false,
      },
      location: {
        type: "string",
        input: false,
        required: false,
      },
      linkedin: {
        type: "string",
        input: false,
        required: false,
      },
      github: {
        type: "string",
        input: false,
        required: false,
      },
      summary: {
        type: "string",
        input: false,
        required: false,
      },
      plan: {
        type: "string",
        input: false,
        required: false,
      },
      skills: {
        type: "string[]",
        input: false,
        required: false,
      },
    },
  },
});
