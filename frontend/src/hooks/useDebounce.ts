import { useRef, useCallback } from "react";

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedCallback = useCallback(
        (...args: any[]) => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );

    return debouncedCallback;
};

export default useDebounce;
