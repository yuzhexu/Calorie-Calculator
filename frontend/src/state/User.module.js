import React, { createContext, useState ,useEffect} from "react";
import { getItem } from "../services/ClientStorage";
export const UserContext = createContext();

/*
 * State module for handling User context globally thoroughout our app
 */

export const UserContextProvider = ({ children }) => {

  const storedToken = getItem('token');
  const storedUserId = getItem('userId');
  const [token, setToken] = useState(storedToken);
  const [userId, setUserId] = useState(storedUserId);
  useEffect(() => {
    const isUserId = getItem('userId');
    if(isUserId) {
      setUserId(isUserId);
    } 
  }, []);
  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        userId,
        setUserId
      }}
    >
      {children}
    </UserContext.Provider>
  );

};
