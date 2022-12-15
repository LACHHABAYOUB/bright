import { useState } from "react";

// Use token hook
export const useToken = () => {
  // If token in local store set initial
  const [token, setTokenInternal] = useState(() => {
    return sessionStorage.getItem("auth-token");
  });

  const setToken = (newToken) => {
    sessionStorage.setItem("auth-token", newToken);
    setTokenInternal(newToken);
  };
  
  return [token, setToken];
};
