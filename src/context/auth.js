import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import * as Cookies from "js-cookie";
import createActivityDetector from 'activity-detector'

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
    const [isIdle, setIsIdle] = useState(false)

    const setSessionCookie = session => {
      
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

  
  useEffect(() => {
    console.log('EFFECT')
    const activityDetector = createActivityDetector({timeToIdle: 600e3, autoInit: false })
    activityDetector.init();
    activityDetector.on('idle', () => {
      setIsIdle(true)
      //signOut()
      console.log('IDLE')
    })
    //activityDetector.on('idle', () => signOut())
    activityDetector.on('active', () => {
      setIsIdle(false)
      console.log('ACTIVE')
    })
    return () => activityDetector.stop()
  }, [])

    return {
          authSession,
          setSessionCookie,
          signOut,
          isIdle
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
