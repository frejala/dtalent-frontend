import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface User {
  id: string;
  initials: string;
  hasPendingReceipts: boolean;
  lastLogin: string;
  isSuperuser: boolean;
  username: string;
  firstName: string;
  lastName: string;
  nationality: string;
  email: string;
  fullName: string;
  role: string;
  dateJoined: string;
  createdAt: string;
  modifiedAt: string;
  address: string;
  phoneNumber: string;
  employeeNumber: number;
  requiredPasswordChange: boolean;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
