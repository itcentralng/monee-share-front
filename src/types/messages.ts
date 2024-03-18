import { Id } from "../../convex/_generated/dataModel";

export type Message = {
    _id: Id<"messages">;
    _creationTime: number;
    response?: string | undefined;
    user: Id<"users">;
    role: string;
    content: string;
}