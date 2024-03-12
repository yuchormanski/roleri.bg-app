import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useMoveBack } from '../hooks/useMoveBack.js';
import { useAuthContext } from '../context/AuthContext.jsx';

export function RouteGuardAuthenticated({ children }) {
    const { redirectTo } = useMoveBack();
    const { checkIsUserLoggedIn } = useAuthContext();

    useEffect(() => {
        const isLogged = checkIsUserLoggedIn();
        if (!isLogged) {
            redirectTo("/home");
            return;
        }

    }, [checkIsUserLoggedIn, redirectTo]);

    return children ? children : <Outlet />;
}