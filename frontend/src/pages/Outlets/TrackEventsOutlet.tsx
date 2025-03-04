import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Layout from "@/layouts/Layout";
import { useAnalytics } from "@/hooks/useAnalytics";

const TrackEventsOutlet = () => {
    const location = useLocation();
    const { trackEvent } = useAnalytics();

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
