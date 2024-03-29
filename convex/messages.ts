import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { getSingleByPhone } from "./users";
import { Id } from "./_generated/dataModel";

export const get = query({
  handler: async ({ db }) => {
    return await db.query("messages").collect();
  },
});

export const list = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const messages = (await ctx.db.query("messages").filter((q) => q.eq(q.field("user"), userId as Id<"users">)).collect())
    return messages
  },
});

export const send = mutation({
  args: { content: v.string(), role: v.string(), phone: v.string() },
  handler: async (ctx, { content, phone, role }) => {
    const foundUser = await getSingleByPhone(ctx, { phone: phone })
    if (foundUser._id)
      return await ctx.db.insert("messages", { content, user: foundUser._id, role, });
    return { error: "Message not sent" }
  },
});


export const sendToDB = action({
  args: { Body: v.string(), From: v.string() },
  handler: async (ctx, { Body, From, }) => {
    if (process.env.API_URL) {
      const formData = new FormData();
      formData.append('Body', Body);
      formData.append('From', From);
      const data = await fetch(process.env.API_URL, {
        method: "POST",
        body: formData
      });
      console.log(data);
      return await data.json()
    }
    else return { error: "API url not set" }
  },
});