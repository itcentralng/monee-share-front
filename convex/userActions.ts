"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";

export const createUser = action({
  args: { Body: v.string(), From: v.string() },
  handler: async (ctx, { Body, From }) => {
    if (process.env.API_URL) {
      const formData = new FormData();
      formData.append("Body", Body);
      formData.append("From", From);
      const data = await fetch(process.env.API_URL, {
        method: "POST",
        body: formData,
      });
    } else return { error: "API url not set" };
  },
});
