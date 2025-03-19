import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Layout from "@/layouts/Layout";
import { useAnalytics } from "@/hooks/useAnalytics";
import useAuth from "@/hooks/useAuth";
import { useRefreshTokenQuery } from "@/store";
import useReferrer from "@/hooks/useReferrer";

const TrackEventsOutlet = () => {
    const location = useLocation();
    const { token } = useAuth();
    const { trackEvent } = useAnalytics();
    const referrer = useReferrer();

    const isAuthLocation =
        location.pathname === "/login" || location.pathname === "/register";

    useRefreshTokenQuery(undefined, {
        skip: !!token || isAuthLocation,
    });

    useEffect(() => {
        trackEvent("page_view", {
            pageUrl: window.location.href,
            pageTitle: document.title,
            referrer,
        });
    }, [location.pathname]);

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default TrackEventsOutlet;
