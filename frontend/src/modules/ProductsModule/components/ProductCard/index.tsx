import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import type { Product } from "@/types/Product";

interface ProductCardProps {
    data?: Product;
    isLoading: boolean;
}

const ProductCard = ({ data, isLoading }: ProductCardProps) => {
    const price = data ? +data.price.toFixed(2) : null;
    let discountedPrice;

    if (data && data.discountPercent) {
        discountedPrice = data.discountedPrice
            ? +data.discountedPrice.toFixed(2)
            : +(
                  (price as number) -
                  ((price as number) * data.discountPercent) / 100
              ).toFixed(2);
    }

    return (
        <Link
            to={isLoading ? "#" : `/product/${data?._id}`}
            className={`flex flex-col ${isLoading && "pointer-events-none"}`}
        >
            <div>
                {isLoading ? (
                    <Skeleton variant="rectangular" height={240} />
                ) : (
                    <img
                        src={data?.imageUrl[0]}
                        alt={data?.title}
                        loading="lazy"
                        className="max-h-[450px]"
                    />
                )}
            </div>
            <div className="flex flex-col py-4 w-full">
                <h3 className="text-gray-600 font-bold">
                    {isLoading ? <Skeleton width={150} /> : data?.title}
                </h3>
                <p className="text-sm">
                    {isLoading ? (
                        <Skeleton width="80%" />
                    ) : (
                        data?.description?.slice(0, 50) + "..."
                    )}
                </p>
                <div className="text-sm text-gray-600">
                    {isLoading ? <Skeleton width={100} /> : data?.color}
                </div>
                <p className="font-semibold space-x-2">
                    {isLoading ? (
                        <Skeleton width={80} />
                    ) : discountedPrice ? (
                        <>
                            <span>${discountedPrice}</span>
                            <span className="text-gray-500 line-through">
                                ${price}
                            </span>
                            <span className="text-green-600">
                                {data?.discountPercent}% off
                            </span>
                        </>
                    ) : (
                        "$" + price
                    )}
                </p>
            </div>
        </Link>
    );
};

export default ProductCard;
