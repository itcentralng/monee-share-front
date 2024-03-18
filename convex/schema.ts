import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema(
  {
    users: defineTable({
      safehavenId: v.string(),
      firstName: v.string(),
      lastName: v.string(),
      phone: v.string(),
      email: v.string(),
      account: v.string(),
      nin: v.string(),
      pin: v.string(),
      bvn: v.string(),
      password: v.string(),
    }),
    services: defineTable({
      safehavenId: v.string(),
      name: v.string(),
      identifier: v.string(),
      description: v.string(),
    }),
    discos: defineTable({
      name: v.string(),
      states: v.array(v.string()),
    }),
    serviceCategories: defineTable({
      safehavenId: v.string(),
      serviceId: v.id("services"),
      name: v.string(),
      identifier: v.string(),
      description: v.string(),
    }),
    messages: defineTable({
      user: v.id("users"),
      role: v.string(),
      content: v.string(),
      response: v.optional(v.string()),
    }),
    transactions: defineTable({
      user: v.id("users"),
      status: v.string(),
      command: v.string(),
      type: v.string(),
    }),
    banks: defineTable({
      name: v.string(),
      bankCode: v.string(),
      categoryId: v.string(),
    }),
  },
  { schemaValidation: true }
);
