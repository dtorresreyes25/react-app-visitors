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
    const activityDetector = createActivityDetector({timeToIdle: 9000})
    activityDetector.on('idle', () => {
      setIsIdle(true)
      signOut()
    })
    //activityDetector.on('idle', () => signOut())
    // activityDetector.on('active', () => setIsIdle(false))
    return () => activityDetector.stop()
  }, [])


      
    // useEffect(()=>(
    //     setInterval(()=>{
    //        console.log('time lapsed')
    //     },60000)
    //    // setAuthSession(session=>getSessionCookie())
    //   ),[])

     // const session = getSessionCookie();

     // const authSession = useMemo(() => (
     //     getSessionCookie()
     // ), [session])

     console.log('auth component')


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
