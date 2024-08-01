import darkTheme from "./dark";
import lightTheme from "./light";

const getStoredTheme = (): "dark" | "light" => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark" ? "dark" : "light";
};

export const appTheme = getStoredTheme() === "dark" ? darkTheme : lightTheme;
