import { Route, Routes } from "react-router-dom";
import PrivateOutlet from "./pages/PrivateOutlet";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
    return (
        <Routes>
            <Route element={<PrivateOutlet />}>
                <Route index element={<Dashboard />} />
                <Route path="/:page/:category" element={<Category />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Route>
        </Routes>
    );
};

export default App;
