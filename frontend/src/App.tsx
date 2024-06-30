import { Route, Routes } from "react-router-dom";
import PrivateOutlet from "./pages/PrivateOutlet";
import GenderCategories from "./pages/GenderCategories";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<PrivateOutlet />}>
                <Route path="/women" element={<GenderCategories />} />
                <Route path="/men" element={<GenderCategories />} />
            </Route>
        </Routes>
    );
};

export default App;
