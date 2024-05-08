import { Id } from "../../convex/_generated/dataModel";

export type UserOnClient =
  | {
      _id: string;
      phone: string;
      password: string;
      safehavenOd: string;
      firstName: string;
      account: string;
      error?: undefined;
    }
  | {
      error: string;
      _id: undefined;
      phone?: undefined;
      account?: undefined;
      firstName?: undefined;
      safhavenId?: undefined;
    }
  | null;

export type UserOnConvex = {
  _id: Id<"users">;
  safehavenId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  account: string;
  pin: string;
  nin: string;
  bvn: string;
  password: string;
};
