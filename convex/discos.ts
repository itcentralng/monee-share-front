import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  handler: async ({ db }, { state }: { state: string }) => {
    const discos = await db.query("discos").collect();
    return discos.filter((disco) => disco.states.includes(state));
  },
});
