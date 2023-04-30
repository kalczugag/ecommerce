import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useDevState from "./hooks/use-dev-state";
import useChangeDevState from "./hooks/use-change-dev-state";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Item from "./pages/Item";
import Navbar from "./componenets/Navbar";

const App = () => {
    const handleChangeDevMode = useChangeDevState();
    const location = useLocation();
    const isDev = useDevState();

    useEffect(() => {
        if (location.pathname === "/") {
            handleChangeDevMode(false);
        } else if (location.pathname === "/admin") {
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
                className="fixed left-2 border text-sm"
            >
                mode
            </button>
            <Navbar isDev={isDev} />
            <div className="m-4 mt-12">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/item" element={<Item />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
