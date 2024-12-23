import { Button, IconButton } from "@mui/material";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import type { Item } from "@/types/Order";

interface CartProductItemProps {
    data: Item;
    isLoading: boolean;
    editable?: boolean;
    onQuantityChange?: (productId: string, quantity: number) => void;
    onDelete?: (productId: string) => void;
}

const CartProductItem = ({
    data,
    isLoading,
    editable = true,
    onQuantityChange,
    onDelete,
}: CartProductItemProps) => {
    const { _product, size, quantity: itemQuantity } = data;

    let discountedPrice = 0;
    let price = 0;
    if (_product) {
        price = +_product.price.toFixed(2);

        if (_product.discountPercent) {
            discountedPrice = +(
                (price - (price * _product.discountPercent) / 100) *
                itemQuantity
            ).toFixed(2);
        }
    }

    return (
        <div className="flex flex-col space-y-4 p-6 w-full shadow border rounded">
            <div className="flex space-x-2">
                <img
                    src={`${_product?.imageUrl[0]}?imwidth=144`}
                    alt={_product?.title}
                    className="w-36 h-36 border object-top object-cover"
                />
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-2">
                        <h3 className="font-bold">{_product?.title}</h3>
                        <p className="text-gray-500">Size: {size}</p>
                        <p className="text-gray-500">
                            Seller: {_product?.brand}
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
                                    {_product?.discountPercent}% off
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
                                onQuantityChange(data._id!, itemQuantity - 1)
                            }
                            disabled={isLoading || itemQuantity === 1}
                        >
                            <RemoveCircleOutline />
                        </IconButton>
                        <span>{itemQuantity}</span>
                        <IconButton
                            onClick={() =>
                                onQuantityChange(data._id!, itemQuantity + 1)
                            }
                            disabled={isLoading}
                        >
                            <AddCircleOutline />
                        </IconButton>
                    </div>
                    <Button
                        variant="contained"
                        onClick={() => onDelete(data._id!)}
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
