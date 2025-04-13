import { Link } from "react-router-dom";
import { Box, IconButton, Rating } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { TColors, colors } from "@/constants/colors";
import type { Product } from "@/types/Product";
import { useState } from "react";
import SafeHtmlRender from "../SafeHtmlRender";

interface ProductCardProps {
    data: Product;
    isLoading: boolean;
    variant?: "default" | "highlighted";
    size?: "sm" | "md" | "lg";
    badges?: {
        title: string;
        bgColor?: TColors;
        textColor?: TColors;
    }[];
    showRating?: boolean;
    isFavorite?: (productId: string) => boolean;
    onWishlistTrigger?: (productId: string, action: "add" | "remove") => void;
}

// in pixels
const sizes = {
    sm: {
        width: "160",
    },
    md: {
        width: "250",
    },
    lg: {
        width: "450",
    },
};

const ProductCard = ({
    data,
    isLoading,
    variant = "default", // TODO
    size = "md",
    isFavorite: favoriteLocal,
    badges,
    onWishlistTrigger,
}: ProductCardProps) => {
    const {
        _id,
        title,
        isFavorite: favoriteDb,
        discountedPrice,
        imageUrl,
        color,
        discountPercent,
        price,
        analytics,
        description,
    } = data;

    const [isHovered, setIsHovered] = useState(false);
    const [isHeartHovered, setIsHeartHovered] = useState(false);

    const isFavorite = favoriteLocal ? favoriteLocal(_id || "") : favoriteDb;

    return (
        <Box
            className={`flex flex-col ${
                variant === "default" ? "" : "items-center justify-center"
            } ${isLoading && "pointer-events-none"}`}
            style={{
                maxWidth: `${sizes[size].width}px`,
            }}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`relative ${size === "sm" && "text-center"}`}>
                <Link to={`/product/${_id}`}>
                    <img
                        src={`${imageUrl[0]}?imwidth=${sizes[size].width}`}
                        alt={title}
                        loading="lazy"
                        className={`max-h-[${sizes[size].width}px]`}
                    />
                </Link>
                <div
                    className="absolute top-2 right-0"
                    onClick={(e) => e.stopPropagation()}
                    onMouseOver={() => setIsHeartHovered(true)}
                    onMouseLeave={() => setIsHeartHovered(false)}
                >
                    <IconButton
                        disableRipple
                        disableFocusRipple
                        onClick={() =>
                            onWishlistTrigger &&
                            onWishlistTrigger(
                                data._id || "",
                                isFavorite ? "remove" : "add"
                            )
                        }
                        sx={{
                            backgroundColor: "white",
                            color: "black",
                            borderRadius: 0,
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
                </div>
                {badges && (
                    <div className="absolute bottom-2 left-2 z-10 flex space-x-1">
                        {badges.map(({ title, bgColor, textColor }, index) => (
                            <div
                                key={title + "_" + index}
                                className="rounded px-2 py-1 text-xs font-semibold"
                                style={{
                                    color: textColor
                                        ? colors[textColor]
                                        : "black",
                                    backgroundColor: bgColor
                                        ? colors[bgColor]
                                        : "white",
                                }}
                            >
                                {title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Link to={`/product/${_id}`} className="flex flex-col py-4 w-full">
                <h3 className={`font-bold ${isHovered && "opacity-80"}`}>
                    {title}
                </h3>
                <p className="text-xs opacity-80">
                    <SafeHtmlRender
                        htmlContent={
                            description?.slice(0, size === "sm" ? 35 : 50) +
                            "..."
                        }
                    />
                </p>
                <div className="text-sm text-gray-600">{color}</div>
                {analytics?.reviewCount > 0 && (
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        paddingY={0.25}
                    >
                        <Rating
                            name="half-rating"
                            value={analytics.average}
                            size="small"
                            precision={0.5}
                            readOnly
                            sx={{
                                color: "inherit",
                            }}
                        />
                        <span className="text-xs font-semibold">
                            ({analytics.reviewCount})
                        </span>
                    </Box>
                )}
                <p className="font-semibold space-x-2">
                    {(discountPercent && discountPercent > 0) ||
                    discountedPrice !== price ? (
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
            </Link>
        </Box>
    );
};

export default ProductCard;
