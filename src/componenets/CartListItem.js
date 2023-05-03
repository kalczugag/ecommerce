import { useDispatch } from "react-redux";
import { removeFromCart } from "../store";
import { GoTrashcan } from "react-icons/go";
import Button from "./Button";

const CartListItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleDeleteItemFromCart = (item) => {
        dispatch(removeFromCart(item));
    };

    return (
        <div className="flex flex-row justify-between items-center mb-2 text-white">
            <div>
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 object-contain"
                />
            </div>
            <div className="flex-1">{item.title}</div>
            <div className="flex-none">${item.price}</div>
            <Button
                onClick={() => handleDeleteItemFromCart(item)}
                className="border-0"
            >
                <GoTrashcan />
            </Button>
        </div>
    );
};

export default CartListItem;
