import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Navbar from "./componenets/Navbar";

const App = () => {
    const [isDev, setIsDev] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            setIsDev(false);
        } else if (location.pathname === "/admin") {
            setIsDev(true);
        }
    }, [location.pathname]);

    return (
        <div>
            <Navbar isDev={isDev} />
            <div className="m-4 mt-12">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
