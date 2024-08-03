import "@/styles/app.css";

import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import NavigationLayout from "@/layouts/NavigationLayout";
import useTheme from "@/hooks/useTheme";
import Dashboard from "@/pages/Dashboard";
import ProductAdd from "@/pages/Products/add";
import GeneralSettings from "@/pages/Settings/GeneralSettings";
import AccountSettings from "@/pages/Settings/AccountSettings";
import NotFound from "@/pages/404";

const App = () => {
    const { theme } = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <NavigationLayout>
                <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="/products/add" element={<ProductAdd />} />
                    <Route path="/settings">
                        <Route index element={<GeneralSettings />} />
                        <Route path="account" element={<AccountSettings />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </NavigationLayout>
        </ThemeProvider>
    );
};

export default App;
