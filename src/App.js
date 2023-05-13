import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useDevState from "./hooks/use-dev-state";
import useChangeDevState from "./hooks/use-change-dev-state";
import Navbar from "./componenets/Navbar";
import MenHome from "./pages/MenHome";
import Admin from "./pages/Admin";
import Items from "./pages/Items";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";

const App = () => {
    const handleChangeDevMode = useChangeDevState();
    const location = useLocation();
    const isDev = useDevState();

    useEffect(() => {
        if (location.pathname === "/") {
            handleChangeDevMode(false);
            window.location.href = "/men-home";
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
                    <Route index path="men-home" element={<MenHome />} />
                    <Route path="admin" element={<Admin />}>
                        <Route path="items" element={<Items />} />
                        <Route path="orders" element={<Orders />} />
                    </Route>
                    <Route path="checkout" element={<Checkout />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
