import { useState, lazy, Suspense } from "react";
import {
    useEditUsersCartMutation,
    ProductResult,
    setDrawer,
    useUpdateWishlistMutation,
} from "@/store";
import { useSnackbar } from "notistack";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/useStore";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import DefaultLayout from "@/layouts/DefaultLayout";
import DetailsProductCard from "./components/DetailsProductCard";
const FeaturedBar = lazy(() => import("./components/FeaturedBar"));

export type Sizes = string;

interface ReadProductModuleProps {
    config: {
        isLoading: boolean;
    };
    data?: ProductResult;
}

const ReadProductModule = ({ config, data }: ReadProductModuleProps) => {
    const { isLoading } = config;
    const dispatch = useAppDispatch();
    const { cartId, token } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const { trackEvent } = useAnalytics();
    const { handleMutation } = useHandleMutation();
    const [wishlist, setWishlist] = useState<string[]>(() => {
        const stored = localStorage.getItem("wishlist");
        return stored ? JSON.parse(stored) : [];
    });

    const [editCart, { isLoading: editLoading }] = useEditUsersCartMutation();
    const [updateWishlist] = useUpdateWishlistMutation();

    const toggleDrawer = (newOpen: boolean) => {
        dispatch(setDrawer(newOpen));
    };

    const handleAddToCart = async (size: Sizes | null) => {
        if (!size) {
            enqueueSnackbar("Please select a size", {
                variant: "warning",
            });
        } else if (data && token && cartId) {
            {
                const itemPrice =
                    (data.discountPercent ?? 0) > 0
                        ? data.price -
                          (data.price * (data.discountPercent ?? 1)) / 100
                        : data.price;

                handleMutation({
                    values: {
                        cartId,
                        _product: data._id,
                        action: "add",
                        color: data.color,
                        size,
                        unitPrice: itemPrice,
                        quantity: 1,
                    },
                    mutation: editCart,
                    onSuccess: () => {
                        toggleDrawer(true);
                        trackEvent("add_to_cart", {
                            _cart: cartId,
                            _product: data._id,
                        });
                    },
                    snackbar: false,
                });
            }
        } else {
            enqueueSnackbar("Please log in to add items to your cart.", {
                variant: "warning",
            });
        }
    };

    const handleWishlist = (action: "add" | "remove") => {
        if (!data || !data._id) return;

        const productId = data._id;

        if (token) {
            updateWishlist({ productId, type: action });
        }

        setWishlist((prevWishlist) => {
            let updated: string[];

            if (action === "add" && !prevWishlist.includes(productId)) {
                updated = [...prevWishlist, productId];
            } else if (action === "remove") {
                updated = prevWishlist.filter((id) => id !== productId);
            } else {
                updated = prevWishlist;
            }

            localStorage.setItem("wishlist", JSON.stringify(updated));
            return updated;
        });
    };

    const isFavorite = wishlist.includes(data?._id ?? "");
    const productCategory =
        data?.topLevelCategory?.name + "," + data?.secondLevelCategory?.name;

    return (
        <DefaultLayout>
            <DetailsProductCard
                data={data as any}
                isLoading={isLoading}
                isFavorite={isFavorite}
                editLoading={editLoading}
                onAddToCart={handleAddToCart}
                onWishlistTrigger={handleWishlist}
            />

            <Suspense fallback={null}>
                <FeaturedBar
                    category={productCategory}
                    productLoading={isLoading}
                />
            </Suspense>
        </DefaultLayout>
    );
};

export default ReadProductModule;
