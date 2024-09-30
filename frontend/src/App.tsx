import { Route, Routes } from "react-router-dom";
import PrivateOutlet from "@/pages/PrivateOutlet";
import Dashboard from "@/pages/Dashboard";
import Catalog from "@/pages/Products/list";
import ProductDetails from "@/pages/Products/details";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateOutlet />}>
                <Route index element={<Dashboard />} />
                <Route
                    path="/:topLevel/:secondLevel?/:thirdLevel?"
                    element={<Catalog />}
                />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
            </Route>
        </Routes>
    );
};

export default App;
