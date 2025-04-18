import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip,
    Divider,
    Grid,
    Paper,
    IconButton,
} from "@mui/material";
import Slider from "react-slick";
import { Star, Inventory, CropFree } from "@mui/icons-material";
import type { Product } from "@/types/Product";

interface ProductCardProps {
    product: Partial<Product>;
}

const isValidImageUrl = (url: string) =>
    typeof url === "string" && url.startsWith("http");

const ProductCard = ({ product }: ProductCardProps) => {
    const imagesString = product.imageUrl as string;
    const imageUrls = imagesString
        ? imagesString
              .split(",\n")
              .map((url) => url.trim())
              .filter(isValidImageUrl)
        : [];

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
    };

    const placeholderImage = "https://placehold.co/600x400";

    return (
        <Card
            sx={{
                maxWidth: 500,
                mx: "auto",
                boxShadow: 3,
                borderRadius: 2,
                overflow: "hidden",
                height: "100%",
            }}
        >
            <Box sx={{ position: "relative" }}>
                <Slider {...sliderSettings}>
                    {imageUrls.length >= 2 ? (
                        imageUrls.map((url, index) => (
                            <Box key={index} sx={{ height: 300 }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={url}
                                    alt={`${
                                        product.title ?? "Product"
                                    } - Image ${index + 1}`}
                                    sx={{ objectFit: "cover" }}
                                />
                            </Box>
                        ))
                    ) : imageUrls.length === 1 ? (
                        <CardMedia
                            component="img"
                            height="300"
                            image={imageUrls[0]}
                            alt={`${product.title ?? "Product"} - Image`}
                            sx={{ objectFit: "cover" }}
                        />
                    ) : (
                        <CardMedia
                            component="img"
                            height="300"
                            image={placeholderImage}
                            alt="No image available"
                            sx={{ objectFit: "cover" }}
                        />
                    )}
                </Slider>
                <IconButton
                    sx={{
                        position: "absolute",
                        bottom: 4,
                        right: 4,
                        backgroundColor: "white",
                        "&:hover": {
                            backgroundColor: "white",
                        },
                    }}
                >
                    <CropFree />
                </IconButton>
            </Box>

            <CardContent sx={{ p: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                    }}
                >
                    <Chip
                        size="small"
                        label={
                            (product.topLevelCategory?.name ?? "Category") +
                            " / " +
                            (product.thirdLevelCategory?.name ?? "Subcategory")
                        }
                        color="primary"
                        variant="outlined"
                        sx={{ fontSize: 11 }}
                    />
                    <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                        {product.brand ?? "Unknown Brand"}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                    }}
                >
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: "bold", flexGrow: 1 }}
                    >
                        {product.title ?? "Untitled Product"}
                    </Typography>

                    {product.analytics && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Star sx={{ color: "gold", fontSize: 18 }} />
                            <Typography
                                variant="body2"
                                sx={{ ml: 0.5, fontWeight: "medium" }}
                            >
                                {product.analytics.average}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ ml: 0.5 }}
                            >
                                ({product.analytics.reviewCount})
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography
                        variant="h5"
                        component="span"
                        sx={{ fontWeight: "bold", mr: 1 }}
                    >
                        $
                        {product.discountedPrice
                            ? product.discountedPrice
                            : product.price}
                    </Typography>

                    {product.price &&
                        product.discountedPrice &&
                        product.discountedPrice < product.price && (
                            <Typography
                                variant="body1"
                                component="span"
                                sx={{
                                    textDecoration: "line-through",
                                    color: "text.secondary",
                                    mr: 1,
                                }}
                            >
                                ${Number(product.price).toFixed(2)}
                            </Typography>
                        )}

                    {product.price &&
                        product.discountedPrice &&
                        product.discountedPrice < product.price && (
                            <Chip
                                size="small"
                                label={`${product.discountPercent}% OFF`}
                                color="error"
                                sx={{ fontSize: 11, fontWeight: "bold" }}
                            />
                        )}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>
                            Color:
                        </Typography>
                        <Box
                            sx={{
                                width: 16,
                                height: 16,
                                bgcolor: product.color ?? "grey.300",
                                borderRadius: "50%",
                                border: 1,
                                borderColor: "grey.300",
                                mr: 1,
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{ textTransform: "capitalize" }}
                        >
                            {product.color ?? "N/A"}
                        </Typography>
                    </Box>
                    {product.sku && (
                        <Typography variant="body2" color="text.secondary">
                            SKU: {product.sku}
                        </Typography>
                    )}
                </Box>

                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Available Sizes:
                </Typography>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                    {product.size?.length ? (
                        product.size.map((size, index) => (
                            <Grid item key={size.name + "_" + index}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        border: 1,
                                        borderColor: "grey.300",
                                        p: 1,
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {size.name}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {size.quantity} in stock
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))
                    ) : (
                        <Grid item>
                            <Typography variant="body2" color="text.secondary">
                                No sizes available
                            </Typography>
                        </Grid>
                    )}
                </Grid>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Inventory
                            sx={{
                                fontSize: 16,
                                mr: 0.5,
                                color: "text.secondary",
                            }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            Total:{" "}
                            {product.size?.reduce(
                                (a, b) => a + b.quantity,
                                0
                            ) ?? 0}{" "}
                            units
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
