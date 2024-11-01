import { useState } from "react";
import { Rating, Skeleton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import type { Sizes } from "../../ReadProductModule";
import type { ShortReviewsCount } from "@/types/Review";
import type { Product } from "@/types/Product";
import CustomCarousel from "@/components/Carousel";

interface DetailsProductCardProps {
    data?: Product;
    isLoading: boolean;
    editLoading: boolean;
    rating: ShortReviewsCount;
    onAddToCart: (size: Sizes) => void;
}

const DetailsProductCard = ({
    data,
    isLoading,
    editLoading,
    rating,
    onAddToCart,
}: DetailsProductCardProps) => {
    const [currSize, setCurrSize] = useState<Sizes>("M");

    const price = data ? +data.price.toFixed(2) : 0;
    let discountedPrice: number | undefined;

    if (data?.discountPercent) {
        discountedPrice = data.discountedPrice
            ? +data.discountedPrice.toFixed(2)
            : +(price - (price * data.discountPercent) / 100).toFixed(2);
    }

    const content = data?.imageUrl.map((url, index) => (
        <img
            key={url + "_" + index}
            src={url}
            alt={`${data?.title} photo-${index}`}
        />
    ));

    return (
        <div className="flex flex-col space-x-0 md:flex-row md:space-x-10">
            <div>
                {isLoading ? (
                    <Skeleton variant="rectangular" width={400} height={550} />
                ) : (
                    <div className="overflow-x-scroll flex max-w-[600px]">
                        {content}
                    </div>
                )}
            </div>
            <div className="flex flex-col py-4 space-y-6 w-full">
                <div className="space-y-1 w-full">
                    {isLoading ? (
                        <>
                            <Skeleton variant="text" width={200} height={40} />
                            <Skeleton variant="text" width={250} height={30} />
                            <Skeleton variant="text" width={100} height={20} />
                        </>
                    ) : (
                        <>
                            <h3 className="text-2xl font-bold underline">
                                {data?.brand}
                            </h3>
                            <p className="text-2xl text-gray-700">
                                {data?.title}
                            </p>
                            <span className="text-gray-600">{data?.color}</span>
                        </>
                    )}
                </div>
                <p className="text-xl font-semibold space-x-2">
                    {isLoading ? (
                        <Skeleton variant="text" width={150} height={30} />
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
                <div>
                    {isLoading ? (
                        <Skeleton
                            variant="rectangular"
                            width={150}
                            height={30}
                        />
                    ) : (
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
                    )}
                </div>
                <div className="space-y-2">
                    {isLoading ? (
                        <Skeleton variant="text" width={100} height={20} />
                    ) : (
                        <p className="font-bold text-sm">Size</p>
                    )}
                    <div className="flex space-x-2">
                        {isLoading
                            ? Array.from(new Array(3)).map((_, index) => (
                                  <Skeleton
                                      key={index}
                                      variant="rectangular"
                                      width={60}
                                      height={40}
                                      className="rounded"
                                  />
                              ))
                            : data?.size.map((size, index) => (
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
                        loading={editLoading || isLoading}
                        variant="contained"
                    >
                        Add to cart
                    </LoadingButton>
                </div>
                <div className="text-gray-700 md:w-96">
                    {isLoading ? (
                        <>
                            <Skeleton variant="text" width="100%" height={20} />
                            <Skeleton variant="text" width="90%" height={20} />
                            <Skeleton variant="text" width="80%" height={20} />
                        </>
                    ) : (
                        data?.description
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailsProductCard;
