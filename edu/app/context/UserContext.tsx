import { createContext, useContext, useState, ReactNode } from 'react';
import { useUser } from '@clerk/clerk-expo';

type UserContextType = {
  userData: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    imageUrl: string | null;
  } | null;
};

const UserContext = createContext<UserContextType>({ userData: null });

export function UserContextProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [userData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.primaryEmailAddress?.emailAddress,
    imageUrl: user?.imageUrl,
  });

  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the user context
export const useUserData = () => useContext(UserContext); 