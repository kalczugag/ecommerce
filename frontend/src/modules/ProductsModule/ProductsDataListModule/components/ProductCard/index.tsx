import { Link } from "react-router-dom";
import type { Product } from "@/types/Product";
import ProductCardSkeleton from "./ProductCardSkeleton";

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

    console.log(`${data?.imageUrl}/imwidth=450`);

    return (
        <>
            {isLoading ? (
                <ProductCardSkeleton />
            ) : (
                <Link
                    to={isLoading ? "#" : `/product/${data?._id}`}
                    className={`flex flex-col ${
                        isLoading && "pointer-events-none"
                    }`}
                >
                    <img
                        src={`${data?.imageUrl[0]}?imwidth=450`}
                        alt={data?.title}
                        loading="lazy"
                        className="max-h-[450px]"
                    />
                    <div className="flex flex-col py-4 w-full">
                        <h3 className="text-gray-600 font-bold">
                            {data?.title}
                        </h3>
                        <p className="text-sm">
                            {data?.description?.slice(0, 50) + "..."}
                        </p>
                        <div className="text-sm text-gray-600">
                            {data?.color}
                        </div>
                        <p className="font-semibold space-x-2">
                            {discountedPrice ? (
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
            )}
        </>
    );
};

export default ProductCard;
