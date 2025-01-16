import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { LocalMallOutlined } from "@mui/icons-material";

interface CartIconProps {
    count: number;
}

const CartIcon = ({ count }: CartIconProps) => {
    const navigate = useNavigate();

    return (
        <IconButton onClick={() => navigate("/cart")}>
            <LocalMallOutlined sx={{ position: "relative" }} />
            {count > 0 ? (
                <div className="absolute -right-1 top-0 flex justify-center items-center rounded-full w-4 h-4 text-xs text-white bg-red-500">
                    {count}
                </div>
            ) : null}
        </IconButton>
    );
};

export default CartIcon;
