import { Route, Routes } from "react-router-dom";
import Layout from "@/layouts/Layout";
import Dashboard from "@/pages/Dashboard";
import Catalog from "@/pages/Catalog";
import ProductDetails from "@/pages/ProductDetails";

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route index element={<Dashboard />} />
                <Route path="/:page/:category" element={<Catalog />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
        </Layout>
    );
};

export default App;
