// input user capabilities through frontend react so that way we can create states of which user is logged in based
// on what the username used to login was
import React, { createContext, useContext, useState, ReactNode } from "react";

// UserContextProps is a module imported from React to keep track of the username (userName below) and includes the setUserName
// function that takes in a string and sets userName to that value
interface UserContextProps {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

// initializes UserContext as undefined for now
const UserContext = createContext<UserContextProps | undefined>(undefined);

// function responsible for initializing the children nodes (children nodes used to update information related to the user)
interface UserProviderProps {
  //children nodes
  children: ReactNode;
}

// function responsible for updating the children nodes
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userName, setUserName] = useState("");
  //returns the value for the children which include userName and setUserName function
  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

//input: UserContext
//output: context value of the user
// used to update context of the user to make sure we are using it correctly 
export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
