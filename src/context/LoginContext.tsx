import { createContext } from "react";
import { User } from "../typings";

type LoginContextType = {
  user: User | null;
  // eslint-disable-next-line no-unused-vars
  setUser: (user: User) => void;
};

export const LoginContext = createContext<LoginContextType>({
  user: null,
  setUser: () => {}
});
