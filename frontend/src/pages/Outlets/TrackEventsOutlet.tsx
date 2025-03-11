import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Layout from "@/layouts/Layout";
import { useAnalytics } from "@/hooks/useAnalytics";
import useAuth from "@/hooks/useAuth";
import { useRefreshTokenQuery } from "@/store";

const TrackEventsOutlet = () => {
    const location = useLocation();
    const { token } = useAuth();
    const { trackEvent } = useAnalytics();

    const isAuthLocation =
        location.pathname === "/login" || location.pathname === "/register";

    useRefreshTokenQuery(undefined, {
        skip: !!token || isAuthLocation,
    });

    useEffect(() => {
        const previousUrl =
            sessionStorage.getItem("previousPageUrl") || "direct";

        trackEvent("page_view", {
            pageUrl: window.location.href,
            pageTitle: document.title,
            referrer: previousUrl,
        });

        sessionStorage.setItem("previousPageUrl", window.location.href);
    }, [location.pathname]);

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default TrackEventsOutlet;
