import { Button, IconButton } from "@mui/material";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface WishlistProps {
    isMobile: boolean;
}

const Wishlist = ({ isMobile }: WishlistProps) => {
    const navigate = useNavigate();

    const handleNavigate = () => navigate("/wishlist");

    return (
        <>
            {" "}
            {isMobile ? (
                <IconButton onClick={handleNavigate}>
                    <FavoriteBorderOutlined />
                </IconButton>
            ) : (
                <Button
                    onClick={handleNavigate}
                    startIcon={<FavoriteBorderOutlined />}
                    color="inherit"
                >
                    Wishlist
                </Button>
            )}
        </>
    );
};

export default Wishlist;
