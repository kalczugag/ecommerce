import { Button, IconButton } from "@mui/material";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import type { Item } from "@/types/Cart";
import type { Sizes } from "@/modules/ProductsModule/ReadProductModule";

interface CartProductItemProps {
    data: Item;
    isLoading: boolean;
    editable?: boolean;
    onQuantityChange?: (
        productId: string,
        quantity: number,
        size: Sizes,
        color: string
    ) => void;
    onDelete?: (productId: string, size: Sizes, color: string) => void;
}

const CartProductItem = ({
    data,
    isLoading,
    editable = true,
    onQuantityChange,
    onDelete,
}: CartProductItemProps) => {
    const { product, size, quantity: itemQuantity } = data;

    let discountedPrice = 0;
    let price = 0;
    if (product) {
        price = +product.price.toFixed(2);

        if (product.discountPercent) {
            discountedPrice = +(
                (price - (price * product.discountPercent) / 100) *
                itemQuantity
            ).toFixed(2);
        }
    }

    return (
        <div className="flex flex-col space-y-4 p-6 w-full shadow border rounded">
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
                                    ${price * itemQuantity}
                                </span>
                                <span className="text-green-600">
                                    {product?.discountPercent}% off
                                </span>
                            </>
                        ) : (
                            "$" + price * itemQuantity
                        )}
                    </p>
                </div>
            </div>
            {editable && onQuantityChange && onDelete && (
                <div className="flex space-x-8">
                    <div className="flex items-center space-x-1">
                        <IconButton
                            onClick={() =>
                                onQuantityChange(
                                    product!._id!,
                                    itemQuantity - 1,
                                    data.size,
                                    data.color
                                )
                            }
                            disabled={isLoading || itemQuantity === 1}
                        >
                            <RemoveCircleOutline />
                        </IconButton>
                        <span>{itemQuantity}</span>
                        <IconButton
                            onClick={() =>
                                onQuantityChange(
                                    product!._id!,
                                    itemQuantity + 1,
                                    data.size,
                                    data.color
                                )
                            }
                            disabled={isLoading}
                        >
                            <AddCircleOutline />
                        </IconButton>
                    </div>
                    <Button
                        variant="contained"
                        onClick={() =>
                            onDelete(product!._id!, data.size, data.color)
                        }
                        disabled={isLoading}
                    >
                        Remove
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CartProductItem;
