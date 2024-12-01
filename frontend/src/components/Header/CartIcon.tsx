import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { LocalMallOutlined } from "@mui/icons-material";
import type { Cart } from "@/types/Cart";

interface CartIconProps {
    data?: Cart;
}

const CartIcon = ({ data }: CartIconProps) => {
    const navigate = useNavigate();

    return (
        <IconButton onClick={() => navigate("/cart")}>
            <LocalMallOutlined sx={{ position: "relative" }} />
            {data && data._products.length > 0 ? (
                <div className="absolute -right-2 top-0 flex justify-center items-center rounded-full w-5 h-5 text-xs text-white bg-red-500">
                    {data._products.length}
                </div>
            ) : null}
        </IconButton>
    );
};

export default CartIcon;
