import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useReferrer() {
    const location = useLocation();
    const [referrerType, setReferrerType] = useState("direct");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const currentUrl = new URL(window.location.href);
            const referrer =
                sessionStorage.getItem("referrer") || document.referrer;

            if (!referrer) {
                setReferrerType("direct");
            } else {
                try {
                    const referrerUrl = new URL(referrer);

                    if (referrerUrl.host === currentUrl.host) {
                        setReferrerType("organic");
                    } else {
                        setReferrerType("referral");
                    }
                } catch (error) {
                    setReferrerType("direct");
                }
            }

            sessionStorage.setItem("referrer", window.location.href);
        }
    }, [location.key]);

    return referrerType;
}

export default useReferrer;
