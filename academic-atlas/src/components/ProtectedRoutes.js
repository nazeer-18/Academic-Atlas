import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'; 

export default function ProtectedRoute() { 
    const tokenInLocalStorage = localStorage.getItem('atlasToken'); 
    const tokenInSessionStorage = sessionStorage.getItem('atlasToken');
    if (!(tokenInLocalStorage || tokenInSessionStorage) && window.location.pathname!='/login'   ) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />
}
