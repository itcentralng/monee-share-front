import { Id } from "../../convex/_generated/dataModel"

export type Transaction = {
    user: Id<"users">
    command: string
    type: string
    status: string
}