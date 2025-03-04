import { useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import useAuth from "./useAuth";
import type { Event } from "@/types/Analytics";

type UseAnalyticsReturn = {
    trackEvent: (eventType: string, metadata: unknown) => void;
};

export const useAnalytics = (flushInterval = 5000): UseAnalyticsReturn => {
    const eventQueueRef = useRef<Event[]>([]);
    const sessionId = getOrCreateSessionId();
    const { userId } = useAuth();

    const trackEvent = (eventType: string, metadata: any) => {
        eventQueueRef.current.push({
            eventType,
            metadata,
            timestamp: new Date(),
            _session: sessionId,
            _user: userId || undefined,
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
