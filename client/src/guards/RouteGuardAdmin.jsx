import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useMoveBack } from '../hooks/useMoveBack.js';
import { useAuthContext } from '../context/AuthContext.jsx';

export function RouteGuardAdmin({ children }) {
    const { redirectTo } = useMoveBack();
    const { checkIsUserAdmin } = useAuthContext();

    useEffect(() => {
        const isAdmin = checkIsUserAdmin();
        if (!isAdmin) {
            redirectTo("/home");
            return;
        }

    }, [checkIsUserAdmin, redirectTo]);

    return children ? children : <Outlet />;
}