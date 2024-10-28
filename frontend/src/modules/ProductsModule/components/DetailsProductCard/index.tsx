import { useState } from "react";
import { Rating } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import type { Sizes } from "../../ReadProductModule";
import type { ShortReviewsCount } from "@/types/Review";
import type { Product } from "@/types/Product";

interface DetailsProductCardProps {
    data: Product;
    isLoading: boolean;
    rating: ShortReviewsCount;
    onAddToCart: (size: Sizes) => void;
}

const DetailsProductCard = ({
    data,
    isLoading,
    rating,
    onAddToCart,
}: DetailsProductCardProps) => {
    const [currSize, setCurrSize] = useState<Sizes>("M");

    const price = +data.price.toFixed(2);
    let discountedPrice;

    if (data.discountPercent) {
        if (data.discountedPrice) {
            discountedPrice = +data.discountedPrice.toFixed(2);
        } else {
            discountedPrice = +(
                price -
                (price * data.discountPercent) / 100
            ).toFixed(2);
        }
    }

    return (
        <div className="flex flex-col space-x-0 md:flex-row md:space-x-10">
            <div>
                <img
                    src={data.imageUrl[0]}
                    alt={data.title}
                    loading="lazy"
                    className="max-h-[850px]"
                />
            </div>
            <div className="flex flex-col py-4 space-y-6 w-full">
                <div className="space-y-1 w-full">
                    <h3 className="text-2xl font-bold underline">
                        {data.brand}
                    </h3>
                    <p className="text-2xl text-gray-700">{data.title}</p>
                    <span className="text-gray-600">{data.color}</span>
                </div>
                <p className="text-xl font-semibold space-x-2">
                    {discountedPrice ? (
                        <>
                            <span>${discountedPrice}</span>
                            <span className="text-gray-500 line-through">
                                ${price}
                            </span>
                            <span className="text-green-600">
                                {data.discountPercent}% off
                            </span>
                        </>
                    ) : (
                        "$" + price
                    )}
                </p>
                <div>
                    <div className="flex flex-row items-center space-x-2">
                        <Rating
                            name="half-rating"
                            defaultValue={rating.value}
                            precision={0.5}
                            readOnly
                        />
                        <span className="text-sm text-gray-500">
                            {rating.value * 5} Ratings
                        </span>
                        <span className="text-sm font-bold text-gray-600">
                            {rating.count} reviews
                        </span>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="font-bold text-sm">Size</p>
                    <div className="grid grid-cols-3 w-40 gap-4">
                        {data.size.map((size, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrSize(size.name)}
                                className={`flex items-center justify-center p-4 border rounded transition-all hover:shadow ${
                                    currSize === size.name &&
                                    "bg-gray-100 font-bold"
                                }`}
                            >
                                {size.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <LoadingButton
                        onClick={() => onAddToCart(currSize)}
                        loading={isLoading}
                        variant="contained"
                    >
                        Add to cart
                    </LoadingButton>
                </div>
                <div className="text-gray-700 md:w-96">{data.description}</div>
            </div>
        </div>
    );
};

export default DetailsProductCard;
