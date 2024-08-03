import { useEffect, useState } from "react";
import darkTheme from "../styles/theme/dark";
import lightTheme from "../styles/theme/light";
import { Theme } from "@mui/material/styles";

type ModeType = "light" | "dark";

const useTheme = () => {
    const [mode, setMode] = useState<ModeType>(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark" ? "dark" : "light";
    });

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(mode);

        localStorage.setItem("theme", mode);
    }, [mode]);

    const handleChange = (arg: ModeType) => setMode(arg);

    const theme: Theme = mode === "dark" ? darkTheme : lightTheme;

    return { theme, mode, handleChange };
};

export default useTheme;
