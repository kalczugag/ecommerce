import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "./hooks/use-thunk";
import { fetchPosts } from "./store";
import useDevState from "./hooks/use-dev-state";
import useChangeDevState from "./hooks/use-change-dev-state";
import Navbar from "./componenets/Navbar";
import Home from "./pages/Home";
import Admin, { config } from "./pages/Admin";
import Table from "./componenets/Table";
import Orders from "./componenets/Orders";

const App = () => {
    const [doFetchPosts] = useThunk(fetchPosts);
    const data = useSelector((state) => state.posts.data) || [];
    const handleChangeDevMode = useChangeDevState();
    const location = useLocation();
    const isDev = useDevState();

    useEffect(() => {
        if (location.pathname === "/") {
            handleChangeDevMode(false);
        } else if (location.pathname === "/admin") {
            handleChangeDevMode(true);
            doFetchPosts();
        }
    }, [handleChangeDevMode, location.pathname, doFetchPosts]);

    const handleModeChange = () => {
        handleChangeDevMode(!isDev);
    };

    return (
        <div>
            <button
                onClick={handleModeChange}
                className="fixed right-2 border text-sm"
            >
                mode
            </button>
            <Navbar isDev={isDev} />
            <div className="m-4 mt-12">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="admin" element={<Admin />}>
                        <Route
                            path="items"
                            element={<Table config={config} data={data} />}
                        />
                        <Route path="orders" element={<Orders />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
};

export default App;
