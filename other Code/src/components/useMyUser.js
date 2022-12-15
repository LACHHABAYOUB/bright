import { useState, useEffect } from "react";
import { useToken } from "./useToken";

export const useMyUser = () => {
  const token = useToken();
  const getPayloadFromToken = (token) => {
    const encodedPayload = (token && token[0]) ? token[0].split("|")[0]:"";
    const userRole = (token && token[0]) ? token[0].split("|")[1]:"user";
    //console.log(`User role is ${userRole}`);
    //return JSON.parse(atob(encodedPayload));
    return encodedPayload + "|" + userRole;
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getPayloadFromToken(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getPayloadFromToken(token));
    }
  }, [token]);
  return user;
};
