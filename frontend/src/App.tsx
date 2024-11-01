import { Route, Routes } from "react-router-dom";
import PrivateOutlet from "@/pages/Outlets/PrivateOutlet";
import VisitorsCounterOutlet from "@/pages/Outlets/VisitorsCounterOutlet";
import Dashboard from "@/pages/Dashboard";
import Catalog from "@/pages/Products/list";
import ProductDetails from "@/pages/Products/details";
import OrderDetails from "@/pages/Orders/details";
import OrdersList from "@/pages/Orders/list";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Delivery from "@/pages/Checkout/Delivery";
import Summary from "@/pages/Checkout/Summary";
import CheckoutStatus from "@/pages/Checkout/Status";
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
                    <Route path="/orders">
                        <Route index element={<OrdersList />} />
                        <Route path=":id" element={<OrderDetails />} />
                    </Route>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout/:orderId/*" element={<Checkout />}>
                        <Route path="delivery" element={<Delivery />} />
                        <Route path="summary" element={<Summary />} />
                        <Route path="*" element={<CheckoutStatus />} />
                    </Route>
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;
