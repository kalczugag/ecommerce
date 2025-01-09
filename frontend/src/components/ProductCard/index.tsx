import { Link } from "react-router-dom";
import { Box, Rating } from "@mui/material";
import { TColors, colors } from "@/constants/colors";
import type { Product } from "@/types/Product";

interface ProductCardProps {
    data: Product;
    isLoading: boolean;
    // variant?: string;
    size?: "sm" | "md" | "lg";
    badges?: {
        title: string;
        bgColor?: TColors;
        textColor?: TColors;
    }[];
    showRating?: boolean;
}

// in pixels
const sizes = {
    sm: {
        height: "150",
    },
    md: {
        height: "450",
    },
    lg: {
        height: "600",
    },
};

const ProductCard = ({
    data,
    isLoading,
    // variant, // TODO
    size = "md",
    badges,
    showRating = false,
}: ProductCardProps) => {
    const {
        _id,
        title,
        discountedPrice,
        imageUrl,
        color,
        discountPercent,
        price,
        description,
    } = data;

    return (
        <Link
            to={`/product/${_id}`}
            className={`flex flex-col ${isLoading && "pointer-events-none"}`}
        >
            <div className="relative">
                <img
                    src={`${imageUrl[0]}?imwidth=${sizes[size].height}`}
                    alt={title}
                    loading="lazy"
                    className={`max-h-[${sizes[size].height}px]`}
                />
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
            <div className="flex flex-col py-4 w-full">
                <h3 className="text-gray-600 font-bold">{title}</h3>
                <p className="text-sm">{description?.slice(0, 50) + "..."}</p>
                <div className="text-sm text-gray-600">{color}</div>
                {showRating && (
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        paddingY={0.25}
                    >
                        <Rating
                            name="half-rating"
                            defaultValue={2.5}
                            size="small"
                            precision={0.5}
                            readOnly
                            sx={{
                                color: "inherit",
                            }}
                        />
                        <span className="text-xs font-semibold">(202)</span>
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
            </div>
        </Link>
    );
};

export default ProductCard;
