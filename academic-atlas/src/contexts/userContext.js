import React, { createContext, useState, useContext, useEffect } from 'react';
const UserContext = createContext();
export function UserProvider({ children }) {
    const [user, setUser] = useState({
        email: '',
        userName: '',
        mobile: '',
        password: '',
        role: '',
    });
    const [logged, setLogged] = useState(false);
    useEffect(() => {
        const userInLocalStorage = localStorage.getItem('loggedInUser');
        if (userInLocalStorage) {
            setLogged(true);
            setUser(JSON.parse(userInLocalStorage));
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