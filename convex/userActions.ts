"use node"
import { action } from "./_generated/server";

export const createUser = action({
    handler: async (ctx, body) => {
        const user = await fetch("https://artistic-preferably-sole.ngrok-free.app/convex/user", {
            method: "POST",
            headers: {
                accept: "application/json"
            },
            body: JSON.stringify(body)
        })
        return await user.json();
    },
});
