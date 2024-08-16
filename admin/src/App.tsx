import "@/styles/app.css";

import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import useTheme from "@/hooks/useTheme";
import Dashboard from "@/pages/Dashboard";
import ProductAdd from "@/pages/Products/add";
import ProductsList from "@/pages/Products/list";
import ProductsEdit from "@/pages/Products/edit";
import CustomersList from "@/pages/Customers/list";
import CustomersEdit from "@/pages/Customers/edit";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import PrivateOutlet from "@/pages/PrivateOutlet";
import NotFound from "@/pages/404";

const App = () => {
    const { theme } = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateOutlet />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/products" element={<ProductsList />} />
                    <Route
                        path="/products/edit/:id"
                        element={<ProductsEdit />}
                    />
                    <Route path="/products/add" element={<ProductAdd />} />
                    <Route path="/customers" element={<CustomersList />} />
                    <Route
                        path="/customers/edit/:id"
                        element={<CustomersEdit />}
                    />
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
