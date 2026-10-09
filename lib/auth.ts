import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGO_URL!);
const db = client.db();
export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    database: {
      joins: true,
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.CLIENT_ID_GITHUB!,
      clientSecret: process.env.CLIENT_SECRET_GITHUB,
    },
    google: {
      clientId: process.env.CLIENT_ID_GOOGLE!,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE,
    },
  },
  account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ["google", "github"], 
		},
	},
  plugins: [nextCookies()],
});
