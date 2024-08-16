import { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

const useIsMobile = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);

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

    const isMobile = width <= 1024;

    return isMobile;
};

export default useIsMobile;
