import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../components/public/Spinner";
import usePageTitle from '../../hooks/public/usePageTitle';

const AuthLayout = () => {

    usePageTitle();
    const location = useLocation();
    const [loadingPage, setLoadingPage] = useState(false);

    useEffect(() => {
        setLoadingPage(true);
        const timer = setTimeout(() => {
            setLoadingPage(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    if (loadingPage) return <Spinner animateOut={false} />;

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AuthLayout