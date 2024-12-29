import { Route, Routes } from "react-router-dom";
import PrivateOutlet from "@/pages/Outlets/PrivateOutlet";
import VisitorsCounterOutlet from "@/pages/Outlets/VisitorsCounterOutlet";
import AccountOutlet from "@/pages/Outlets/AccountOutlet";
import Dashboard from "@/pages/Dashboard";
import Catalog from "@/pages/Products/List";
import ProductDetails from "@/pages/Products/Details";
import OrderDetails from "@/pages/Orders/Details";
import OrdersList from "@/pages/Orders/List";
import OrderReturn from "@/pages/Orders/Return";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Delivery from "@/pages/Checkout/Delivery";
import Summary from "@/pages/Checkout/Summary";
import AccountDetails from "@/pages/Account/Details";
import AccountOverview from "@/pages/Account/Overview";
import NotFound from "@/pages/404";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<VisitorsCounterOutlet />}>
                <Route index element={<Dashboard />} />
                <Route
                    path="/:topLevel/:secondLevel?/:thirdLevel?"
                    element={<Catalog />}
                />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route element={<PrivateOutlet />}>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout/:orderId/*" element={<Checkout />}>
                        <Route path="delivery" element={<Delivery />} />
                        <Route path="summary" element={<Summary />} />
                    </Route>
                    <Route path="/account" element={<AccountOutlet />}>
                        <Route path="orders" element={<OrdersList />} />
                        <Route path="orders/:id" element={<OrderDetails />} />
                        <Route
                            path="orders/:id/return"
                            element={<OrderReturn />}
                        />
                        <Route index element={<AccountOverview />} />
                        <Route path="details" element={<AccountDetails />} />
                    </Route>
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;
