import React, { createContext, useState, useContext, useEffect } from 'react';
const UserContext = createContext();
export function UserProvider({ children }) {
    const [user, setUser] = useState({
        email: '',
        userName: '',
        mobile: '',
        password: '', //used for login on reload
        role: '',
    });
    const [logged, setLogged] = useState(false);
    useEffect(() => {
        const resetUser =()=>{
            const userInLocalStorage = localStorage.getItem('loggedInUser');
            const userInSessionStorage = sessionStorage.getItem('loggedInUser');
            if (userInLocalStorage) {
                setLogged(true);
                setUser(JSON.parse(userInLocalStorage));
            }
            else if (userInSessionStorage) {
                setLogged(true);
                setUser(JSON.parse(userInSessionStorage));
            }
        }
        resetUser();
        window.addEventListener('load',resetUser);
        return()=>{
            window.removeEventListener('load',resetUser);
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser, logged, setLogged }}>
            {children}
        </UserContext.Provider>
    )
}
export function useUser() {
    return useContext(UserContext);
}