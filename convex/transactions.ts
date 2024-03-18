import { Transaction } from "../src/types/transaction";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const get = query({
  handler: async ({ db }, { userId }) => {
    return await db.query("transactions").filter((q) => q.eq(q.field("user"), userId as Id<"users">)).collect();
  },
});

export const insert = mutation({
  handler: async ({ db }, transaction: Transaction) => {
    await db.insert("transactions", transaction);
  },
});
