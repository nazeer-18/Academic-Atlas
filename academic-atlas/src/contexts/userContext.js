import React, { createContext, useState, useContext, useEffect } from 'react';
import userService from '../services/userService'
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
        const resetUser = async () => {
            const token = localStorage.getItem('atlasToken') || sessionStorage.getItem('atlasToken');
            try {
                if (!token) {
                    setUser({
                        email: '',
                        userName: '',
                    });
                    setLogged(false);
                } else {
                    const response = await userService.validateToken(token);
                    const updatedUser = await userService.fetchUser(response.data.user.email);
                    console.log(updatedUser.data)
                    setUser(updatedUser.data.user);
                    setLogged(true);
                }
            } catch (err) {
                console.error('Token validation failed:', err);
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
            }
        }
        resetUser();
        window.addEventListener('load', resetUser);
        return () => {
            window.removeEventListener('load', resetUser);
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