import { useDispatch } from "react-redux";
import { removeFromCart } from "../store";
import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import Dropdown from "./Dropdown";

const CartListItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleDeleteItemFromCart = (item) => {
        dispatch(removeFromCart(item));
    };

    return (
        <div className="flex flex-row justify-between items-center mb-2 text-white border-r">
            <div>
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 object-contain"
                />
            </div>
            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between p-2">
                    <div className="flex-1">{item.title}</div>
                    <Dropdown />
                    <div className="flex-none">${item.price}</div>
                </div>
                <div className="flex flex-row items-center justify-end text-xs">
                    <Button className="border-none hover:text-gray-300">
                        Add to wishlist
                    </Button>
                    <Button
                        onClick={() => handleDeleteItemFromCart(item)}
                        className="border-none hover:text-gray-300"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartListItem;
