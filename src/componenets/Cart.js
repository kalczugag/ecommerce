import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { BsCart3 } from "react-icons/bs";
import Button from "./Button";
import CartList from "./CartList";

const Cart = () => {
    const [showCart, setShowCart] = useState(false);
    const itemsCount = useSelector((state) => state.cart.itemsCount);
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
            {showCart && <CartList />}
        </div>
    );
};

export default Cart;
