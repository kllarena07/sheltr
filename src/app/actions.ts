"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const createReportAction = async (formData: FormData) => {
  const longitude = formData.get("longitude");
  const latitude = formData.get("latitude");
  const description = formData.get("description");
  const type = formData.get("type");
  const severity = formData.get("severity");

  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    return encodedRedirect("error", "/", "User not authenticated");
  }

  const location = JSON.stringify([longitude, latitude]);

  const { error } = await supabase.from("disasters").insert({
    location,
    description,
    type,
    severity,
    user_id: user.data.user.id,
    likes: 0,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect("error", "/", "Could not create report");
  }

  return encodedRedirect("success", "/", "Report created successfully");
};

export const logoutAction = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/", error.message);
  } else {
    return encodedRedirect("success", "/", "Successfully logged out");
  }
};

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required"
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected/feed");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/profile`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect("error", "/profile", "Could not reset password");
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/profile",
    "Check your email for a link to reset your password."
  );
};
