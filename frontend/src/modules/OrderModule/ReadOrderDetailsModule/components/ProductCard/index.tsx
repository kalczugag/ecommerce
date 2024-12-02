import { Skeleton } from "@mui/material";
import ProductCardSkeleton from "./ProductCardSkeleton";
import type { Item, Order } from "@/types/Order";
import type { Product } from "@/types/Product";

interface ProductCardProps {
    data: Item;
    status: Order["status"];
    timestamp?: Date;
    isLoading?: boolean;
}

const ProductCard = ({ data, isLoading }: ProductCardProps) => {
    const product = data.product as Product;

    return (
        <>
            {isLoading ? (
                <ProductCardSkeleton />
            ) : (
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row space-x-4">
                        <img
                            src={product.imageUrl[0]}
                            alt={product.title}
                            className="w-20 h-24 object-cover object-top"
                        />
                        <div className="flex flex-col space-y-2">
                            <div className="font-semibold">
                                <p>{product.brand}</p>
                                <p>{product.title}</p>
                            </div>
                            <div className="text-sm">
                                <p>Color: {data.color}</p>
                                <p>Size: {data.size}</p>
                                <p>Product id: {product._id}</p>
                            </div>
                        </div>
                    </div>
                    <div className="font-semibold">
                        ${data.unitPrice.toFixed(2)}
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard;
