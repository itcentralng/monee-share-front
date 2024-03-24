"use node"
import { action } from "./_generated/server";
import { v } from "convex/values";

// export const createUser2 = action({
//     handler: async (ctx, body) => {
//         const user = await fetch("https://artistic-preferably-sole.ngrok-free.app/user", {
//             method: "POST",
//             headers: {
//                 accept: "application/json"
//             },
//             body: JSON.stringify(body)
//         })
//         return await user.json();
//     },
// });


export const createUser = action({
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
        }
        else return { error: "API url not set" }
    },
});