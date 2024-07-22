import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import "./assets/styles/app.css";

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route index element={<Dashboard />} />
            </Routes>
        </Layout>
    );
};

export default App;
