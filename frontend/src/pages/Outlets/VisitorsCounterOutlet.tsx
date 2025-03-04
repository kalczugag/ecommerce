import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRefreshTokenQuery, useUpdateVisitorCountMutation } from "@/store";
import useAuth from "@/hooks/useAuth";
import Layout from "@/layouts/Layout";
import { useAnalytics } from "@/hooks/useAnalytics";

const VisitorsCounterOutlet = () => {
    const { trackEvent } = useAnalytics();

    useEffect(() => {
        trackEvent("page_view", {
            pageUrl: window.location.href,
            pageTitle: document.title,
            referrer: document.referrer,
        });
    }, [window.location.href]);

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default VisitorsCounterOutlet;
