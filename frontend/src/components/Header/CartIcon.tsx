import { useNavigate } from "react-router-dom";
import { Badge, IconButton, styled, badgeClasses } from "@mui/material";
import { LocalMallOutlined } from "@mui/icons-material";

interface CartIconProps {
    count: number;
}

const CartBadge = styled(Badge)`
    & .${badgeClasses.badge} {
        top: -12px;
        right: -6px;
    }
`;

const CartIcon = ({ count }: CartIconProps) => {
    const navigate = useNavigate();

    return (
        <IconButton onClick={() => navigate("/cart")}>
            <LocalMallOutlined />
            <CartBadge
                badgeContent={count}
                sx={{
                    "& .MuiBadge-badge": {
                        color: "white",
                        backgroundColor: "#ef4444",
                    },
                }}
                overlap="circular"
            />
        </IconButton>
    );
};

export default CartIcon;
