import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useDevState from "./hooks/use-dev-state";
import useChangeDevState from "./hooks/use-change-dev-state";
import Navbar from "./componenets/Navbar";
import MenHomePage from "./pages/MenHomePage";
import AdminPage from "./pages/AdminPage";
import ItemsPage from "./pages/ItemsPage";
import OrdersPage from "./pages/OrdersPage";
import CheckoutPage from "./pages/CheckoutPage";
import WishlistPage from "./pages/WishlistPage";

const App = () => {
    const handleChangeDevMode = useChangeDevState();
    const location = useLocation();
    const isDev = useDevState();

    useEffect(() => {
        if (location.pathname === "/" || location.pathname === "/men-home") {
            handleChangeDevMode(false);
            if (location.pathname !== "/men-home") {
                window.location.href = "/men-home";
            }
        } else if (location.pathname === "/admin") {
            handleChangeDevMode(true);
        } else if (location.pathname === "/admin/items") {
            handleChangeDevMode(true);
        } else if (location.pathname === "/admin/orders") {
            handleChangeDevMode(true);
        }
    }, [handleChangeDevMode, location.pathname]);

    const handleModeChange = () => {
        handleChangeDevMode(!isDev);
    };

    return (
        <div>
            <button
                onClick={handleModeChange}
                className="fixed top-16 right-2 border text-sm z-50"
            >
                mode
            </button>
            <Navbar isDev={isDev} />
            <div className="m-4 mt-10">
                <Routes>
                    <Route index path="men-home" element={<MenHomePage />} />
                    <Route path="admin" element={<AdminPage />}>
                        <Route path="items" element={<ItemsPage />} />
                        <Route path="orders" element={<OrdersPage />} />
                    </Route>
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="wishlist" element={<WishlistPage />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
