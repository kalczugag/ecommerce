import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import Button from "./Button";

const Wishlist = () => {
    return (
        <div>
            <Button className="border-0">
                <Link to="/wishlist">
                    <AiOutlineHeart />
                </Link>
            </Button>
        </div>
    );
};

export default Wishlist;
