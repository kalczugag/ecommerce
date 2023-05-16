import { useDispatch } from "react-redux";
import { changeItemsAmount } from "../store";

const CartListItemCounter = ({ item }) => {
    const dispatch = useDispatch();

    const handleIncrementItemsAmount = () => {
        dispatch(changeItemsAmount({ id: item.id, amount: 1 }));
    };

    const handleDecrementItemsAmount = () => {
        dispatch(changeItemsAmount({ id: item.id, amount: -1 }));
    };

    return (
        <div className="flex flex-row items-center mx-2">
            <button
                onClick={handleDecrementItemsAmount}
                className="rounded-l-full border w-6 px-1 border-gray-500 hover:bg-gray-600"
            >
                -
            </button>
            <div className="border-t border-b px-1 border-gray-500">
                {item.count}
            </div>
            <button
                onClick={handleIncrementItemsAmount}
                className="rounded-r-full border w-6 px-1 border-gray-500 hover:bg-gray-600"
            >
                +
            </button>
        </div>
    );
};

export default CartListItemCounter;
