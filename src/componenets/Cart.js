import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { removeFromCart } from "../store";
import { BsCart3 } from "react-icons/bs";
import { GoTrashcan } from "react-icons/go";
import Button from "./Button";

const Cart = () => {
    const dispatch = useDispatch();
    const [showCart, setShowCart] = useState(false);
    const { items, itemsCount, totalPrice } = useSelector((state) => {
        return {
            items: state.cart.items,
            itemsCount: state.cart.itemsCount,
            totalPrice: state.cart.totalPrice,
        };
    });
    const cartRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);

        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [showCart]);

    const handleClickOutside = (event) => {
        if (cartRef.current && !cartRef.current.contains(event.target)) {
            setShowCart(false);
        }
    };

    const handleShowCart = () => {
        setShowCart(!showCart);
    };

    const handleDeleteItemFromCart = (item) => {
        dispatch(removeFromCart(item));
    };

    const renderedItems = items.map((item) => {
        return (
            <div
                key={item.id}
                className="flex flex-row justify-between items-center mb-2 text-white"
            >
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
    });

    return (
        <div ref={cartRef} className="relative">
            <Button
                onClick={handleShowCart}
                className="relative border-0 text-white text-xl"
            >
                <BsCart3 />
                {itemsCount === 0 ? (
                    ""
                ) : (
                    <div className="absolute -top-1 right-0 flex items-center justify-center rounded-full text-sm w-4 h-4 bg-white text-black">
                        {itemsCount}
                    </div>
                )}
            </Button>
            {showCart && (
                <div className="absolute top-full right-0 w-72 text-white text-lg p-3 rounded bg-gray-800 opacity-90 overflow-y-auto">
                    {itemsCount === 0 ? (
                        "The cart is empty"
                    ) : (
                        <div>
                            {renderedItems}
                            <hr className="my-3" />
                            <div className="flex flex-row justify-between items-center text-white">
                                <div>Total:</div>
                                <div>${totalPrice}</div>
                            </div>
                            <Button
                                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded border-0"
                                onClick={() => alert("Checkout clicked")}
                            >
                                Checkout
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;
