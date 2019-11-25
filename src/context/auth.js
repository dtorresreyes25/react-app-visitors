import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import * as Cookies from "js-cookie";
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)


function useAuthProvider() {

    const getSessionCookie = () => {
        const sessionCookie = Cookies.get("session");

        if (sessionCookie === undefined) {
            return false;
        } else {
            return JSON.parse(sessionCookie);

        }
    };

    const [authSession, setAuthSession] = useState(getSessionCookie());


    const setSessionCookie = session => {
        let inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
        Cookies.remove("session");
        Cookies.set("session", session, { expires: inFifteenMinutes });
        setAuthSession(getSessionCookie())
    };


    function secureFileName(filename) {
        const removedBlank = filename.replace(/\s/g, '_')
        const removedAccent = removedBlank.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        return removedAccent
    }



    const uploadUserAvatar = async (file, progress) => {

        const formData = new FormData();

        const safeImageName = secureFileName(file.name)

        formData.append('file', file, safeImageName);

        try {
            const res = await axios.post(`https://api.ict.cu/visitors/api/v1/user/image?token=${authSession.token}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    progress(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );

                    // Clear percentage
                    setTimeout(() => progress(0), 1000);
                }
            })


            const newAuthSession = { ...authSession };

            newAuthSession.avatar = safeImageName;

            setSessionCookie(newAuthSession);

            return res



        } catch (err) {
            if (err.response.status === 500) {
                console.log(err)
                return false
            } else {
                console.log(err)
                return false

            }
        }
    }


    const signOut = () => {

        Cookies.remove("session");
        setAuthSession(getSessionCookie())
    }


    const signIn = (usr, pwd) => {

        const url = "https://api.ict.cu/visitors/api/v1/login";
        axios({
                method: "get",
                url,
                auth: {
                    username: usr,
                    password: pwd
                }
            })
            .then(result => {

                if (result.status === 200) {

                    setSessionCookie(result.data.user);

                    return true;

                } else {

                    return false
                }
            })
            .catch(e => {
                return false
            });
    }


    return {
        authSession,
        signOut,
        signIn,
        uploadUserAvatar
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