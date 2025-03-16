import { useState } from "react";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Rating,
    Select,
    Skeleton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ImagePicker from "./ImagePicker";
import type { Sizes } from "..";
import type { ProductResult } from "@/store";
import type { ShortReviewsCount } from "@/types/Review";
import SafeHtmlRender from "@/components/SafeHtmlRender";

interface DetailsProductCardProps {
    data?: ProductResult;
    isLoading: boolean;
    editLoading: boolean;
    rating: ShortReviewsCount;
    onAddToCart: (size: Sizes | null) => void;
}

const DetailsProductCard = ({
    data,
    isLoading,
    editLoading,
    rating,
    onAddToCart,
}: DetailsProductCardProps) => {
    const [currSize, setCurrSize] = useState<Sizes | null>(null);

    const price = data ? +data.price.toFixed(2) : 0;
    let discountedPrice: number | undefined;

    if (data?.discountPercent) {
        discountedPrice = data.discountedPrice
            ? +data.discountedPrice.toFixed(2)
            : +(price - (price * data.discountPercent) / 100).toFixed(2);
    }

    return (
        <div className="flex flex-col space-x-0 md:flex-row md:space-x-10">
            <div>
                {isLoading ? (
                    <div className="flex flex-col-reverse xl:space-x-10 xl:flex-row">
                        <div className="flex flex-row mt-10 space-x-2 xl:mt-0 xl:space-y-2 xl:space-x-0 xl:flex-col">
                            <Skeleton
                                variant="rectangular"
                                width={100}
                                height={120}
                            />
                            <Skeleton
                                variant="rectangular"
                                width={100}
                                height={120}
                            />
                            <Skeleton
                                variant="rectangular"
                                width={100}
                                height={120}
                            />
                            <Skeleton
                                variant="rectangular"
                                width={100}
                                height={120}
                            />
                        </div>
                        <Skeleton
                            variant="rectangular"
                            width={400}
                            height={550}
                        />
                    </div>
                ) : (
                    <ImagePicker data={data?.imageUrl || []} />
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
                                sx={{
                                    color: "inherit",
                                }}
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
                <div>
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        <Box sx={{ maxWidth: 300 }}>
                            <FormControl fullWidth>
                                <InputLabel id="size-label">Size</InputLabel>

                                {/* TODO: simplify */}

                                <Select
                                    labelId="size-label"
                                    id="size-select"
                                    value={currSize}
                                    label="Size"
                                    onChange={(e) =>
                                        setCurrSize(e.target.value as Sizes)
                                    }
                                    renderValue={(selected) => {
                                        const selectedSize = data?.size.find(
                                            (size) => size.name === selected
                                        );
                                        return (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    width: "100%",
                                                }}
                                            >
                                                <span>{selected}</span>
                                                {selectedSize &&
                                                selectedSize.quantity < 5 &&
                                                selectedSize.quantity !== 0 ? (
                                                    <span
                                                        style={{
                                                            color: "gray",
                                                        }}
                                                    >
                                                        {selectedSize.quantity}{" "}
                                                        pcs. left
                                                    </span>
                                                ) : selectedSize &&
                                                  selectedSize.quantity ===
                                                      0 ? (
                                                    <span
                                                        style={{ color: "red" }}
                                                    >
                                                        Out of stock
                                                    </span>
                                                ) : null}
                                            </Box>
                                        );
                                    }}
                                >
                                    {data?.size.map((size, index) => (
                                        <MenuItem
                                            key={size.name + "_" + index}
                                            value={size.name}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                            disabled={size.quantity === 0}
                                        >
                                            <span>{size.name}</span>
                                            {size.quantity < 5 &&
                                            size.quantity !== 0 ? (
                                                <span className="text-gray-500">
                                                    {size.quantity} pcs. left
                                                </span>
                                            ) : size.quantity === 0 ? (
                                                <span className="text-red-500">
                                                    Out of stock
                                                </span>
                                            ) : null}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    )}
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
                        <SafeHtmlRender htmlContent={data?.description || ""} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailsProductCard;
