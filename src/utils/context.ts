import { createContext } from "solid-js";

export interface ICurrentLoggedInUser {
  id: string;
  karma: number;
}
export const MeContext = createContext<ICurrentLoggedInUser | undefined>(
  undefined
);
