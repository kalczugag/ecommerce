import type { Item } from "@/types/Cart";
import { Button, IconButton } from "@mui/material";

interface CartProductItemProps {
    data: Item;
}

const CartProductItem = ({ data }: CartProductItemProps) => {
    const { product, size, quantity } = data;

    let discountedPrice = 0;
    let price = 0;
    if (product) {
        price = +product.price.toFixed(2);

        if (product.discountPercent) {
            if (product.discountedPrice) {
                discountedPrice = +(product.discountedPrice * quantity).toFixed(
                    2
                );
            } else {
                discountedPrice = +(
                    (price - (price * product.discountPercent) / 100) *
                    quantity
                ).toFixed(2);
            }
        }
    }

    return (
        <div className="flex-1 flex flex-col space-y-4 p-6 shadow h-full border rounded">
            <div className="flex space-x-2">
                <img
                    src={product?.imageUrl[0]}
                    alt={product?.title}
                    className="w-36 h-36 border object-top object-cover"
                />
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-2">
                        <h3 className="font-bold">{product?.title}</h3>
                        <p className="text-gray-500">Size: {size}</p>
                        <p className="text-gray-500">
                            Seller: {product?.brand}
                        </p>
                    </div>
                    <p className="font-semibold space-x-2">
                        {discountedPrice > 0 ? (
                            <>
                                <span>${discountedPrice}</span>
                                <span className="text-gray-500 line-through">
                                    ${price}
                                </span>
                                <span className="text-green-600">
                                    {product?.discountPercent}% off
                                </span>
                            </>
                        ) : (
                            "$" + price
                        )}
                    </p>
                </div>
            </div>
            <div className="flex items-center">
                {/* change to icons */}
                <IconButton>-</IconButton>
                <span>{quantity}</span>
                <IconButton>+</IconButton>
                <Button variant="contained">Remove</Button>
            </div>
        </div>
    );
};

export default CartProductItem;
