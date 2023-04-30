import { useSelector } from "react-redux";
import { BsCart3 } from "react-icons/bs";
import Button from "./Button";

const Cart = () => {
    const { itemsCount } = useSelector((state) => {
        return {
            itemsCount: state.cart.itemsCount,
        };
    });

    return (
        <div>
            <Button className="relative border-0 text-white text-xl">
                <BsCart3 />
                {itemsCount === 0 ? (
                    ""
                ) : (
                    <div className="absolute -top-1 right-0 flex items-center justify-center rounded-full text-sm w-4 h-4 bg-white text-black">
                        {itemsCount}
                    </div>
                )}
            </Button>
        </div>
    );
};

export default Cart;
