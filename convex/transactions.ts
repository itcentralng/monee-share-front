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


export const getSingleByPhone = query({
  handler: async ({ db }, { phone }: { phone: string }) => {
    const response = await db.query("transactions").filter((q) => q.eq(q.field("user"), phone)).order("desc").first();
    if (response?._id) {
      return response
    }
    return { error: "No transactions found" }
  },
});
