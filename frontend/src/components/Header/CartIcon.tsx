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
            {data && data.items.length > 0 ? (
                <div className="absolute -right-1 top-0 flex justify-center items-center rounded-full w-4 h-4 text-xs text-white bg-red-500">
                    {data.items.length}
                </div>
            ) : null}
        </IconButton>
    );
};

export default CartIcon;
