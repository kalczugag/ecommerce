import "@/styles/app.css";

import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import NavigationLayout from "@/layouts/NavigationLayout";
import Dashboard from "@/pages/Dashboard";
import ProductAdd from "@/pages/Products/add";
import useTheme from "@/hooks/useTheme";

const App = () => {
    const { theme } = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <NavigationLayout>
                <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="/products/add" element={<ProductAdd />} />
                </Routes>
            </NavigationLayout>
        </ThemeProvider>
    );
};

export default App;
