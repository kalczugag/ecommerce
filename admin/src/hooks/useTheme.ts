import { useEffect, useState } from "react";
import darkTheme from "../styles/theme/dark";
import lightTheme from "../styles/theme/light";
import { Theme } from "@mui/material/styles";

const useTheme = () => {
    const [mode, setMode] = useState<"light" | "dark">(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark" ? "dark" : "light";
    });

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(mode);

        localStorage.setItem("theme", mode);
    }, [mode]);

    const toggleTheme = () =>
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

    const theme: Theme = mode === "dark" ? darkTheme : lightTheme;

    return { theme, mode, toggleTheme };
};

export default useTheme;
