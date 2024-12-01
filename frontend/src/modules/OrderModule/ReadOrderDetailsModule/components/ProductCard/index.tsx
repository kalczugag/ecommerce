import moment from "moment";
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

const ProductCard = ({
    data,
    timestamp,
    status,
    isLoading,
}: ProductCardProps) => {
    const product = data.product as Product;

    return (
        <>
            {status !== "canceled" ? (
                <div className="flex flex-col">
                    <div className="flex flex-col font-semibold space-y-2">
                        <h2 className="text-2xl">
                            Expected delivery:{" "}
                            {moment(timestamp)
                                .add(2, "days")
                                .format("dd, DD.MM.YYYY")}
                        </h2>
                        <p>Standard delivery within 1-3 business days</p>
                    </div>
                </div>
            ) : (
                <h2 className="text-2xl font-semibold">Products</h2>
            )}

            {isLoading ? (
                <ProductCardSkeleton />
            ) : (
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row space-x-4">
                        {isLoading ? (
                            <img
                                src={product.imageUrl[0]}
                                alt={product.title}
                                className="w-20 h-24 object-cover object-top"
                            />
                        ) : (
                            <Skeleton
                                variant="rectangular"
                                width={100}
                                height={100}
                            />
                        )}
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
