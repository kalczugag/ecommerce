import "./assets/styles/app.css";

import { Routes, Route } from "react-router-dom";
import NavigationLayout from "./layouts/NavigationLayout";
import Dashboard from "./pages/Dashboard";
import ProductAdd from "./pages/Products/add";

const App = () => {
    return (
        <NavigationLayout>
            <Routes>
                <Route index element={<Dashboard />} />
                <Route path="/products/add" element={<ProductAdd />} />
            </Routes>
        </NavigationLayout>
    );
};

export default App;
