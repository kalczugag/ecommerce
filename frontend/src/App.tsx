import { Route, Routes } from "react-router-dom";
import PrivateOutlet from "./pages/PrivateOutlet";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<PrivateOutlet />} />
        </Routes>
    );
};

export default App;
