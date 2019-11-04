import React,{ createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props){
    const [authTokens, setAuthTokens] = useState();
    const [userAuthData, setUserAuthData] = useState();
    
    const setTokens = (data) => {
      localStorage.setItem("tokens", JSON.stringify(data));
      setAuthTokens(data);
    }
    return(
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens ,userAuthData, setUserAuthData}}>
        {props.children}
      </AuthContext.Provider>  
    )

}

