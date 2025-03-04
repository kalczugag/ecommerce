import "@/styles/app.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import appTheme from "./styles/theme/app";
import PrivateOutlet from "@/pages/Outlets/PrivateOutlet";
import TrackEventsOutlet from "@/pages/Outlets/TrackEventsOutlet";
import AccountOutlet from "@/pages/Outlets/AccountOutlet";
import Dashboard from "@/pages/Dashboard";
import Catalog from "@/pages/Products/List";
import ProductDetails from "@/pages/Products/Details";
import OrderDetails from "@/pages/Account/Orders/Details";
import OrdersList from "@/pages/Account/Orders/List";
import OrderReturn from "@/pages/Account/Returns/Add";
import ReturnsList from "@/pages/Account/Returns/List";
import ReturnDetails from "@/pages/Account/Returns/Details";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Delivery from "@/pages/Checkout/Delivery";
import Summary from "@/pages/Checkout/Summary";
import AccountDetails from "@/pages/Account/Details";
import AccountOverview from "@/pages/Account/Overview";
import AccountPreferences from "@/pages/Account/Preferences";
import NotFound from "@/pages/404";

const App = () => {
    return (
        <ThemeProvider theme={appTheme}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<TrackEventsOutlet />}>
                    <Route index element={<Dashboard />} />
                    <Route
                        path="/:topLevel/:secondLevel?/:thirdLevel?"
                        element={<Catalog />}
                    />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route element={<PrivateOutlet />}>
                        <Route path="/cart" element={<Cart />} />
                        <Route
                            path="/checkout/:orderId/*"
                            element={<Checkout />}
                        >
                            <Route path="delivery" element={<Delivery />} />
                            <Route path="summary" element={<Summary />} />
                        </Route>
                        <Route path="/account" element={<AccountOutlet />}>
                            <Route path="orders" element={<OrdersList />} />
                            <Route
                                path="orders/:id"
                                element={<OrderDetails />}
                            />
                            <Route
                                path="orders/:id/return"
                                element={<OrderReturn />}
                            />
                            <Route path="returns" element={<ReturnsList />} />
                            <Route
                                path="returns/:id"
                                element={<ReturnDetails />}
                            />
                            <Route index element={<AccountOverview />} />
                            <Route
                                path="details"
                                element={<AccountDetails />}
                            />
                            <Route
                                path="preferences"
                                element={<AccountPreferences />}
                            />
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
