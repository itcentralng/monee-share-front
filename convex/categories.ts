import { mutation, query } from "./_generated/server";
import { Id } from "../convex/_generated/dataModel";
import { v } from "convex/values";

export const get = query({
  handler: async ({ db }) => {
    return await db.query("serviceCategories").collect();
  },
});

type Category = {
  serviceId: Id<"services">;
  safehavenId: string;
  name: string;
  identifier: string;
  description: string;
};

export const insert = mutation({
  handler: async ({ db }, category: Category) => {
    await db.insert("serviceCategories", category);
    // await db.insert("serviceCategories", {...category, serviceId: category.serviceId as v.id("services")});
  },
});
