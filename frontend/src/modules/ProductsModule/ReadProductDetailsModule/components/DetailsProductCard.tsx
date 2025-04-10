import { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Rating,
    Select,
    Skeleton,
} from "@mui/material";
import ImagePicker from "./ImagePicker";
import type { Sizes } from "..";
import { useUpdateWishlistMutation, type ProductResult } from "@/store";
import SafeHtmlRender from "@/components/SafeHtmlRender";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import useAuth from "@/hooks/useAuth";

interface DetailsProductCardProps {
    data?: ProductResult;
    isLoading: boolean;
    editLoading: boolean;
    onAddToCart: (size: Sizes | null) => void;
}

const KEY = "wishlist";

const DetailsProductCard = ({
    data,
    isLoading,
    editLoading,
    onAddToCart,
}: DetailsProductCardProps) => {
    const [currSize, setCurrSize] = useState<Sizes | null>(null);
    const [isHeartHovered, setIsHeartHovered] = useState(false);

    const isFavorite = Boolean(
        JSON.parse(localStorage.getItem("wishlist") || "[]").includes(data?._id)
    );
    const { token } = useAuth();
    const { handleMutation } = useHandleMutation();
    const [updateWishlist] = useUpdateWishlistMutation();

    const price = data ? +data.price.toFixed(2) : 0;
    let discountedPrice: number | undefined;

    if (data?.discountPercent) {
        discountedPrice = data.discountedPrice
            ? +data.discountedPrice.toFixed(2)
            : +(price - (price * data.discountPercent) / 100).toFixed(2);
    }

    const triggerWishlistLocally = async (
        productId: string,
        action: "add" | "remove"
    ) => {
        const stored: string[] = JSON.parse(localStorage.getItem(KEY) || "[]");

        if (action === "add" && !stored.includes(productId)) {
            stored.push(productId);
            localStorage.setItem(KEY, JSON.stringify(stored));
        } else if (action === "remove" && stored.includes(productId)) {
            const index = stored.indexOf(productId);
            if (index > -1) {
                stored.splice(index, 1);
            }
            localStorage.setItem(KEY, JSON.stringify(stored));
        }

        return {
            statusCode: 200,
            message: "Success",
        };
    };

    const handleAddToFavorite = (action: "add" | "remove") => {
        const fn = () => triggerWishlistLocally(data?._id || "", action);

        handleMutation({
            mutation: updateWishlist,
            localAction: fn,
            isAuthenticated: Boolean(token),
            values: {
                productId: data?._id || "",
                type: action,
            },
            snackbar: false,
        });
    };

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
                                value={data?.analytics.average}
                                precision={0.5}
                                sx={{
                                    color: "inherit",
                                }}
                                readOnly
                            />
                            <span className="text-sm font-bold text-gray-600">
                                {data?.analytics.reviewCount} reviews
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex space-x-2">
                    {isLoading ? (
                        <>
                            <Skeleton variant="text" width={150} height={50} />
                            <Skeleton variant="text" width={50} height={50} />
                        </>
                    ) : (
                        <>
                            <Box sx={{ maxWidth: 300, flex: 1 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="size-label">
                                        Size
                                    </InputLabel>

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
                                            const selectedSize =
                                                data?.size.find(
                                                    (size) =>
                                                        size.name === selected
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
                                                    selectedSize.quantity !==
                                                        0 ? (
                                                        <span
                                                            style={{
                                                                color: "gray",
                                                            }}
                                                        >
                                                            {
                                                                selectedSize.quantity
                                                            }{" "}
                                                            pcs. left
                                                        </span>
                                                    ) : selectedSize &&
                                                      selectedSize.quantity ===
                                                          0 ? (
                                                        <span
                                                            style={{
                                                                color: "red",
                                                            }}
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
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                                disabled={size.quantity === 0}
                                            >
                                                <span>{size.name}</span>
                                                {size.quantity < 5 &&
                                                size.quantity !== 0 ? (
                                                    <span className="text-gray-500">
                                                        {size.quantity} pcs.
                                                        left
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
                            <IconButton
                                onMouseOver={() => setIsHeartHovered(true)}
                                onMouseOut={() => setIsHeartHovered(false)}
                                onClick={() =>
                                    handleAddToFavorite(
                                        isFavorite ? "remove" : "add"
                                    )
                                }
                                disableFocusRipple
                                disableRipple
                                sx={{
                                    backgroundColor: "transparent",
                                    color: "black",
                                    borderRadius: 0,
                                    width: 56,
                                    border: "1px solid black",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        transition: "transform 0.2s ease",
                                        transform:
                                            isHeartHovered || isFavorite
                                                ? "scale(1.2)"
                                                : "scale(1)",
                                    }}
                                >
                                    {isHeartHovered || isFavorite ? (
                                        <Favorite />
                                    ) : (
                                        <FavoriteBorder />
                                    )}
                                </Box>
                            </IconButton>
                        </>
                    )}
                </div>
                <div>
                    <Button
                        onClick={() => onAddToCart(currSize)}
                        variant="contained"
                        loading={editLoading || isLoading}
                        loadingPosition={isLoading ? undefined : "end"}
                    >
                        Add to cart
                    </Button>
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
