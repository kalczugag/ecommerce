import { Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Catalog from "@/pages/Products/list";
import ProductDetails from "@/pages/Products/details";
import PrivateOutlet from "@/pages/PrivateOutlet";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<div>login</div>} />
            <Route path="/register" element={<div>register</div>} />
            <Route element={<PrivateOutlet />}>
                <Route index element={<Dashboard />} />
                <Route
                    path="/:topLevel/:secondLevel?/:thirdLevel?"
                    element={<Catalog />}
                />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Route>
        </Routes>
    );
};

export default App;
