import { Link } from "react-router-dom";
import useCart from "@/hooks/useCart";
import { useAppSelector } from "@/hooks/useStore";
import {
    AddCircleOutline,
    Close,
    RemoveCircleOutline,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    useMediaQuery,
} from "@mui/material";

const CartDrawer = () => {
    const isMobile = useMediaQuery("(max-width: 1024px)");
    const { drawerOpen } = useAppSelector((state) => state.cart);
    const {
        data,
        loading, // change to loading object { get, add, edit } with id of element that is loading
        isEmpty,
        handleCheckout,
        handleQuantityChange,
        handleDelete,
        toggleDrawer,
    } = useCart(drawerOpen);

    return (
        <Drawer
            open={drawerOpen}
            onClose={() => toggleDrawer(false)}
            anchor="right"
        >
            <Box
                sx={{
                    minWidth: isMobile ? "100%" : 400,
                    p: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 4,
                }}
                role="presentation"
            >
                <div className="relative">
                    <IconButton
                        sx={{ position: "absolute", top: -4, left: -4 }}
                        onClick={() => toggleDrawer(false)}
                    >
                        <Close />
                    </IconButton>
                    <h3 className="text-center font-semibold text-lg">
                        Your Cart{" "}
                        <span className="font-normal text-sm text-gray-600">
                            ({data?.result.items.length || 0})
                        </span>
                    </h3>
                </div>
                <Divider />
                <div className="flex-1 space-y-4 h-full overflow-y-auto">
                    {!isEmpty ? (
                        data?.result.items.map((item) => (
                            <div className="flex justify-between space-x-4">
                                <Link
                                    key={item._id}
                                    to={`/product/${item._product._id}`}
                                    onClick={() => toggleDrawer(false)}
                                    className="flex justify-between space-x-4 mr-2"
                                >
                                    <img
                                        src={`${item._product.imageUrl[0]}?imwidth=100`}
                                        className="w-20 h-20 border object-top object-cover"
                                        alt={item._product.title}
                                    />
                                    <div className="flex-1 flex flex-col text-gray-600 text-sm">
                                        <p className="font-semibold text-black">
                                            {item._product.title}
                                        </p>
                                        <p>Size: {item.size}</p>
                                        <p className="font-semibold mt-2">
                                            ${item.total?.toFixed(2)}
                                        </p>
                                    </div>
                                </Link>
                                <div className="flex flex-col">
                                    <div className="flex items-center space-x-1">
                                        <IconButton
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item._id!,
                                                    item.quantity - 1
                                                )
                                            }
                                            disabled={
                                                loading.edit ||
                                                item.quantity === 1
                                            }
                                        >
                                            <RemoveCircleOutline />
                                        </IconButton>
                                        <span>{item.quantity}</span>
                                        <IconButton
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item._id!,
                                                    item.quantity + 1
                                                )
                                            }
                                            disabled={loading.edit}
                                        >
                                            <AddCircleOutline />
                                        </IconButton>
                                    </div>
                                    <Button
                                        onClick={() => handleDelete(item._id!)}
                                        loading={loading.edit}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center items-center space-y-4">
                            <h1 className="text-lg font-bold">
                                Your cart is empty
                            </h1>
                        </div>
                    )}
                </div>
                <Divider />
                <div className="flex justify-between items-end space-x-6">
                    <div className="whitespace-nowrap">
                        <span className="text-sm text-gray-500">Subtotal:</span>{" "}
                        <span className="text-xl">
                            ${data?.result.total.toFixed(2)}
                        </span>
                    </div>
                    <Button
                        variant="contained"
                        onClick={handleCheckout}
                        loading={loading.add}
                        loadingPosition="end"
                        disabled={loading.get}
                    >
                        Checkout
                    </Button>
                </div>
            </Box>
        </Drawer>
    );
};

export default CartDrawer;
