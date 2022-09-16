import { IUser } from "./IUser";

export type AuthContextType = {
    auth?: IUser;
    setAuth?: (auth: IUser) => void;
    //updateTodo: (id: number) => void;
  }; 