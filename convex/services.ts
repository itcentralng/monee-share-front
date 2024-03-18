import { mutation, query } from "./_generated/server";

export const get = query({
  handler: async ({ db }) => {
    return await db.query("services").collect();
  },
});

type Service = {
  safehavenId: string;
  name: string;
  identifier: string;
  description: string;
};

export const insert = mutation({
  handler: async ({ db }, user: Service) => {
    await db.insert("services", user);
  },
});
