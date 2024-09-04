import { Route, Routes } from "react-router-dom";
import Layout from "@/layouts/Layout";
import Dashboard from "@/pages/Dashboard";
import Category from "@/pages/Products";
import ProductDetails from "@/pages/ProductDetails";

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route index element={<Dashboard />} />
                <Route path="/:page/:category" element={<Category />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
        </Layout>
    );
};

export default App;
