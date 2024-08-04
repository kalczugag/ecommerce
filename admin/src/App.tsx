import "@/styles/app.css";

import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import NavigationLayout from "@/layouts/NavigationLayout";
import useTheme from "@/hooks/useTheme";
import Dashboard from "@/pages/Dashboard";
import ProductAdd from "@/pages/Products/add";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/404";

const App = () => {
    const { theme } = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <NavigationLayout>
                <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="/products/add" element={<ProductAdd />} />
                    <Route
                        path="/settings/:settingsKey"
                        element={<Settings />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </NavigationLayout>
        </ThemeProvider>
    );
};

export default App;
