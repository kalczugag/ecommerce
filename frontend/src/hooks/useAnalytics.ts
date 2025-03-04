import { useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";

type AnalyticsEvent = {
    eventName: string;
    eventData: unknown;
    timestamp: number;
    sessionId: string;
};

type UseAnalyticsReturn = {
    trackEvent: (eventName: string, eventData: unknown) => void;
};

export const useAnalytics = (flushInterval = 5000): UseAnalyticsReturn => {
    const eventQueueRef = useRef<AnalyticsEvent[]>([]);
    const sessionId = getOrCreateSessionId();

    const trackEvent = (eventName: string, eventData: any) => {
        eventQueueRef.current.push({
            eventName,
            eventData,
            timestamp: Date.now(),
            sessionId,
        });
    };

    const flushEvents = () => {
        if (eventQueueRef.current.length === 0) return;

        const eventsToSend = [...eventQueueRef.current];
        eventQueueRef.current = [];

        if (typeof navigator.sendBeacon === "function") {
            const blob = new Blob([JSON.stringify(eventsToSend)], {
                type: "application/json",
            });
            navigator.sendBeacon("/api/v1/analytics/events", blob);
        } else {
            fetch("/api/v1/analytics/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-session-id": sessionId,
                },
                body: JSON.stringify(eventsToSend),
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
