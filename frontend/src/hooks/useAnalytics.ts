import { useRef, useEffect, useState, useCallback } from "react";
import { v4 as uuid } from "uuid";
import useAuth from "./useAuth";
import type { Event } from "@/types/Analytics";
import useReferrer from "./useReferrer";

const SESSION_DURATION = 3600;

type SessionData = {
    sessionId: string;
    locale: string;
    isNew?: boolean;
    expiry?: number;
};

type UseAnalyticsReturn = {
    trackEvent: (eventType: string, metadata?: Record<string, any>) => void;
    clearSession: () => void;
};

export const useAnalytics = (flushInterval = 5000): UseAnalyticsReturn => {
    const { userId } = useAuth();
    const userIdRef = useRef<string | null>(userId);
    const eventQueueRef = useRef<Event[]>([]);
    const [session, setSession] = useState<SessionData>({
        sessionId: "",
        locale: "",
    });

    const sessionRef = useRef(session);
    useEffect(() => {
        sessionRef.current = session;
    }, [session]);

    const getOrCreateSession = useCallback(async () => {
        const locale = await getOrSetLocale();
        const now = Date.now();
        const storedSessionStr = localStorage.getItem("sessionData");
        let storedSession: any = null;
        let isNew = false;

        if (storedSessionStr) {
            try {
                storedSession = JSON.parse(storedSessionStr);
            } catch (e) {
                storedSession = null;
            }
        }

        if (
            storedSession &&
            storedSession.sessionId &&
            storedSession.expiry &&
            storedSession.expiry > now
        ) {
            return { sessionId: storedSession.sessionId, locale, isNew: false };
        } else {
            const newSessionId = uuid();
            const expiry = now + SESSION_DURATION * 1000;
            const newSession = { sessionId: newSessionId, locale, expiry };
            localStorage.setItem("sessionData", JSON.stringify(newSession));
            isNew = true;
            return { sessionId: newSessionId, locale, isNew };
        }
    }, []);

    useEffect(() => {
        if (userId) {
            userIdRef.current = userId;
        }
    }, [userId]);

    const referrer = useReferrer();
    useEffect(() => {
        const initializeSession = async () => {
            const sessionData = await getOrCreateSession();
            setSession(sessionData);
            sessionRef.current = sessionData;

            if (sessionData.isNew) {
                trackEvent("session_start", {
                    locale: {
                        country: sessionData.locale.country_name,
                        flag: sessionData.locale.flag,
                    },
                    pageUrl: window.location.href,
                    pageTitle: document.title,
                    referrer,
                });
            }
        };

        initializeSession();
    }, [getOrCreateSession]);

    const trackEvent = (eventType: string, metadata?: Record<string, any>) => {
        const attemptTracking = (retries = 10) => {
            const currentSessionId = sessionRef.current.sessionId;

            if (!currentSessionId && retries > 0) {
                setTimeout(() => attemptTracking(retries - 1), 100);
                return;
            }

            if (currentSessionId) {
                eventQueueRef.current.push({
                    eventType,
                    metadata,
                    timestamp: new Date(),
                    _session: currentSessionId,
                    _user: userIdRef.current || undefined,
                });
            }
        };

        attemptTracking();
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
                    "x-session-id": sessionRef.current.sessionId,
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

    const clearSession = () => {
        localStorage.removeItem("sessionData");
        setSession({ sessionId: "", locale: "" });
    };

    return { trackEvent, clearSession };
};

const getOrSetLocale = async () => {
    const sessionData = localStorage.getItem("sessionData");
    let locale = sessionData ? JSON.parse(sessionData).locale : null;

    if (!locale) {
        try {
            const ipData = await getIPData();
            locale = ipData;
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

    return locale;
};

export const getIPData = async () => {
    const fields =
        "is_eu,country_name,country_code,continent_name,continent_code,calling_code,languages,currency,time_zone,flag";
    const url = `https://api.ipdata.co?api-key=${
        import.meta.env.VITE_IPDATA_API_KEY
    }&fields=${fields}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        const data = await response.json();

        return {
            ...data,
            time_zone: data.time_zone.name,
        };
    } catch (error) {
        console.log(error);
    }
};
