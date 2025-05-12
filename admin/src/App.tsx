import "@/styles/app.css";
import "react-quill/dist/quill.snow.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import useTheme from "@/hooks/useTheme";
import Dashboard from "@/pages/Dashboard";
import ProductAdd from "@/pages/Products/add";
import ProductsList from "@/pages/Products/list";
import ProductsEdit from "@/pages/Products/edit";
import CustomersList from "@/pages/Customers/list";
import CustomersEdit from "@/pages/Customers/edit";
import CustomersAdd from "@/pages/Customers/add";
import OrdersList from "@/pages/Orders/list";
import OrdersManage from "@/pages/Orders/manage";
import CampaignsList from "@/pages/Campaigns/list";
import CampaignsEdit from "./pages/Campaigns/edit";
import CategoriesList from "@/pages/Categories/list";
import CategoriesEdit from "@/pages/Categories/edit";
import CategoriesAdd from "@/pages/Categories/add";
import Overview from "@/pages/Overview";
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
                    <Route path="/products">
                        <Route index element={<ProductsList />} />
                        <Route path=":id" element={<ProductsEdit />} />
                        <Route path="add" element={<ProductAdd />} />
                    </Route>
                    <Route path="/customers">
                        <Route index element={<CustomersList />} />
                        <Route path=":id" element={<CustomersEdit />} />
                        <Route path="add" element={<CustomersAdd />} />
                    </Route>
                    <Route path="/orders">
                        <Route index element={<OrdersList />} />
                        <Route path=":id" element={<OrdersManage />} />
                    </Route>
                    <Route path="/categories">
                        <Route index element={<CategoriesList />} />
                        <Route path=":id" element={<CategoriesEdit />} />
                        <Route path="add" element={<CategoriesAdd />} />
                    </Route>
                    <Route path="/campaigns">
                        <Route index element={<CampaignsList />} />
                        <Route path=":id" element={<CampaignsEdit />} />
                    </Route>
                    <Route path="overview" element={<Overview />} />
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
