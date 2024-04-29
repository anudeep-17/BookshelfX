import React from 'react';
import { User } from '../interfaceModels'

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
  
export const UserContext = React.createContext<UserContextType>({
    user: null,
    setUser: () => {},
});
