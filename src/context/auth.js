import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import * as Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)


function useAuthProvider(){

   const getSessionCookie = () => {
    const sessionCookie = Cookies.get("session");

      if (sessionCookie === undefined) {
        return false;
      } else {
        return JSON.parse(sessionCookie);

      }
    };

    const [authSession, setAuthSession]=useState(getSessionCookie());
  

    const setSessionCookie = session =>{      
      let inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
      Cookies.remove("session");
      Cookies.set("session", session, { expires: inFifteenMinutes});
      setAuthSession(getSessionCookie())
    };
  

    const signOut = () => {

        Cookies.remove("session");
        setAuthSession(getSessionCookie())
    }

    const isAuthenticated = () => {
        setAuthSession(getSessionCookie())
        return true
    }


    return {
          authSession,
          setSessionCookie,
          signOut,
    }
}

export function AuthProvider(props) {
  const auth = useAuthProvider();
      return (
        <AuthContext.Provider value={auth}>
          {props.children}
        </AuthContext.Provider>
      );
}
