import { UserOnConvex } from "../src/types/user";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const get = query({
  handler: async ({ db }) => {
    return await db.query("users").collect();
  },
});

export const getSingleByPhone = query({
  handler: async ({ db }, { phone }: { phone: string }) => {
    const response = await db
      .query("users")
      .filter((q) => q.eq(q.field("phone"), phone))
      .first();
    if (response) {
      return response;
    }
    return { error: "No user found" };
  },
});

export const loginUser = mutation({
  handler: async (
    { db },
    { phone, password, pin }: { phone: string; password: string; pin: string }
  ) => {
    const response = await db
      .query("users")
      .filter((q) => q.eq(q.field("phone"), phone))
      .filter((q) => q.eq(q.field("password"), password))
      .filter((q) => q.eq(q.field("pin"), pin))
      .first();
    if (response) {
      return response;
    }
    return { error: "invalid credentials" };
  },
});

export const getSingleById = query({
  handler: async ({ db }, { userId }) => {
    return await db.get(userId as Id<"users">);
  },
});

export const insert = mutation({
  handler: async ({ db }, user: UserOnConvex) => {
    await db.insert("users", user);
  },
});
