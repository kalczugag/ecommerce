import "@/styles/app.css";

import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import useTheme from "@/hooks/useTheme";
import Dashboard from "@/pages/Dashboard";
import ProductAdd from "@/pages/Products/add";
import Settings from "@/pages/Settings";
import Login from "./pages/Login";
import PrivateOutlet from "./pages/PrivateOutlet";
import NotFound from "@/pages/404";

const App = () => {
    const { theme } = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateOutlet />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/products/add" element={<ProductAdd />} />
                    <Route
                        path="/settings/:settingsKey"
                        element={<Settings />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
};

export default App;
