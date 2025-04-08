import ProductCardSkeleton from "./ProductCardSkeleton";
import type { Item, Order } from "@/types/Order";
import type { Product } from "@/types/Product";
import { Button } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";

interface ProductCardProps {
    data: Item;
    orderId: string;
    status: Order["status"];
    timestamp?: Date;
    isLoading?: boolean;
}

const ProductCard = ({ data, orderId, isLoading }: ProductCardProps) => {
    const product = data._product as Product;
    const navigate = useNavigate();

    return (
        <>
            {isLoading ? (
                <ProductCardSkeleton />
            ) : (
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row space-x-4">
                        <img
                            src={`${product.imageUrl[0]}?imwidth=80`}
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
                                <p>SKU: {product.sku}</p>
                            </div>
                            {!data.reviewed && (
                                <Button
                                    variant="outlined"
                                    sx={{ maxWidth: 170 }}
                                    onClick={() =>
                                        navigate({
                                            pathname: "/product-review",
                                            search: createSearchParams({
                                                orderId: orderId,
                                                productId:
                                                    data._product._id || "",
                                            }).toString(),
                                        })
                                    }
                                >
                                    Review this product
                                </Button>
                            )}
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
