import { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

const useIsMobile = (arg?: number) => {
    const [width, setWidth] = useState(window.innerWidth);

    const debouncedHandleWindowSizeChange = useDebounce(() => {
        setWidth(window.innerWidth);
    }, 250);

    useEffect(() => {
        const handleWindowSizeChange = () => {
            debouncedHandleWindowSizeChange();
        };

        window.addEventListener("resize", handleWindowSizeChange);

        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    const threshold = arg || 1024;

    const isMobile = width <= threshold;

    return isMobile;
};

export default useIsMobile;
