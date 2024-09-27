import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const EmptyCart = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center space-y-4">
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <Button onClick={() => navigate("/")}>Go to products</Button>
        </div>
    );
};

export default EmptyCart;
