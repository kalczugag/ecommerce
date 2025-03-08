import { useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import useAuth from "./useAuth";
import type { Event } from "@/types/Analytics";

type UseAnalyticsReturn = {
    trackEvent: (eventType: string, metadata?: unknown) => void;
};

export const useAnalytics = (flushInterval = 5000): UseAnalyticsReturn => {
    const { userId } = useAuth();
    const userIdRef = useRef<string | null>(userId);
    const eventQueueRef = useRef<Event[]>([]);
    const sessionId = getOrCreateSessionId();

    useEffect(() => {
        if (userId) {
            userIdRef.current = userId;
        }
    }, [userId]);

    const trackEvent = (eventType: string, metadata: any) => {
        eventQueueRef.current.push({
            eventType,
            metadata,
            timestamp: new Date(),
            _session: sessionId,
            _user: userIdRef.current || undefined,
        });
    };

    const flushEvents = () => {
        if (eventQueueRef.current.length === 0) return;

        const eventsToSend = [...eventQueueRef.current];
        eventQueueRef.current = [];

        const payload = JSON.stringify(eventsToSend);

        if (typeof navigator.sendBeacon === "function") {
            const blob = new Blob([payload], {
                type: "application/json",
            });
            navigator.sendBeacon("/api/v1/metrics", blob);
        } else {
            fetch("/api/v1/metrics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-session-id": sessionId,
                },
                body: payload,
                credentials: "include",
            });
        }
    };

    useEffect(() => {
        const intervalId = setInterval(flushEvents, flushInterval);

        return () => {
            clearInterval(intervalId);
            flushEvents();
        };
    }, [flushInterval]);

    return { trackEvent };
};

const getOrCreateSessionId = () => {
    let sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
        sessionId = uuid();
        localStorage.setItem("sessionId", sessionId);
    }

    return sessionId;
};

const getOrSetLocale = async () => {
    let locale = localStorage.getItem("locale");

    if (!locale) {
        try {
            const ipData = await getIPData();
            locale = JSON.stringify(ipData);

            localStorage.setItem("locale", locale);
        } catch (error) {
            locale = JSON.stringify({
                country_name: "Unknown",
                currency: {
                    name: "USD",
                    code: "USD",
                    symbol: "$",
                    native: "$",
                    plural: "United States dollar",
                },
                time_zone: "UTC",
            });
        }
    }
};

const getIPData = async () => {
    const fields =
        "is_eu,country_name,country_code,continent_name,continent_code,calling_code,languages,currency,time_zone";
    const url = `https://api.ipdata.co?api-key=${
        import.meta.env.VITE_IPDATA_API_KEY
    }&fields=${fields}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};
