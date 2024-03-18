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
  args: { content: v.string(), phone: v.string() },
  handler: async (ctx, { content, phone, }) => {
    if (process.env.API_URL) {
      const data = await fetch(process.env.API_URL, {
        method: "POST",
        body: JSON.stringify({ content, phone })
      });
    }
    else return { error: "API url not set" }
  },
});