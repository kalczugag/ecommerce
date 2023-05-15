import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "./Button";
import CartListItem from "./CartListItem";

const CartList = ({ showCart }) => {
    const { items, itemsCount, totalPrice } = useSelector((state) => {
        return {
            items: state.cart.items,
            itemsCount: state.cart.itemsCount,
            totalPrice: state.cart.totalPrice,
        };
    });

    const renderedItems = items.map((item) => {
        return <CartListItem key={item.id} item={item} />;
    });

    const checkoutSection = (
        <>
            <hr className="my-3" />
            <div className="flex flex-row justify-between items-center text-white">
                <div>Total:</div>
                <div>${totalPrice}</div>
            </div>
            <Button
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded border-0"
                onClick={showCart}
            >
                <Link
                    className="flex justify-start w-full h-full"
                    to="/checkout"
                >
                    Checkout
                </Link>
            </Button>
        </>
    );

    return (
        <div className="absolute top-10 right-0 w-80 text-white text-lg p-3 pt-5 rounded bg-gray-800 opacity-90 z-10">
            <div className="max-h-80 overflow-y-auto">
                {itemsCount === 0 ? (
                    "The cart is empty"
                ) : (
                    <div>{renderedItems}</div>
                )}
            </div>
            <div>{checkoutSection}</div>
        </div>
    );
};

export default CartList;
