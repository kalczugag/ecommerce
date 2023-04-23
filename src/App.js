import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Navbar from "./componenets/Navbar";

const App = () => {
    return (
        <div>
            <Navbar />
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
