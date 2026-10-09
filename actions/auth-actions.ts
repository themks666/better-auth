"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUp = async (email: string, password: string, name: string) => {
  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
      callbackURL: "/dashboard",
    },
  });
  return result;
};

export const singnIn = async (email: string, password: string) => {
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: "/dashboard",
    },
  });
  return result;
};
export const singnInSocialMedia = async (provider:"github"|"google") => {
  const {url} = await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: "/dashboard",
    },
  });
  redirect(url!)
};

export const signOut = async () => {
  const result = await auth.api.signOut({ headers: await headers() });
  return result;
};
