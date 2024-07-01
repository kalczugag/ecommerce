import { Route, Routes } from "react-router-dom";
import PrivateOutlet from "./pages/PrivateOutlet";
import GenderCategories from "./pages/GenderCategories";
import Home from "./pages/Home";

const App = () => {
    return (
        <Routes>
            <Route element={<PrivateOutlet />}>
                <Route index element={<Home />} />
                <Route path="/women/:category" element={<GenderCategories />} />
                <Route path="/men/:category" element={<GenderCategories />} />
            </Route>
        </Routes>
    );
};

export default App;
