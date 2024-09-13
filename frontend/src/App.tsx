import { Route, Routes } from "react-router-dom";
import Layout from "@/layouts/Layout";
import Dashboard from "@/pages/Dashboard";
import Catalog from "@/pages/Products/list";
import ProductDetails from "@/pages/Products/details";
import PrivateOutlet from "@/pages/PrivateOutlet";

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route element={<PrivateOutlet />}>
                    <Route index element={<Dashboard />} />
                    <Route
                        path="/:topLevel/:secondLevel?/:thirdLevel?"
                        element={<Catalog />}
                    />
                    <Route path="/product/:id" element={<ProductDetails />} />
                </Route>
            </Routes>
        </Layout>
    );
};

export default App;
