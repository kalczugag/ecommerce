import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAddOrderMutation, useLazyGetUsersCartQuery } from "@/store";
import { useAnalytics } from "@/hooks/useAnalytics";
import {
    Badge,
    IconButton,
    styled,
    badgeClasses,
    Popper,
    Grow,
    Paper,
    Divider,
    Button,
    useMediaQuery,
} from "@mui/material";
import { LocalMallOutlined } from "@mui/icons-material";
import { useCallback, useEffect, useRef, useState } from "react";
import useAuth from "@/hooks/useAuth";
import Loading from "../Loading";

interface CartIconProps {
    count: number;
}

const CartBadge = styled(Badge)`
    & .${badgeClasses.badge} {
        top: -12px;
        right: -6px;
    }
`;

const CartIcon = ({ count }: CartIconProps) => {
    const isMobile = useMediaQuery("(max-width: 1024px)");
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { trackEvent } = useAnalytics();
    const { token } = useAuth();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const [triggerFetch, { data, isLoading }] = useLazyGetUsersCartQuery();
    const [addOrder, { isLoading: addLoading }] = useAddOrderMutation();

    const handleOpen = useCallback(() => {
        if (isMobile) return;
        if (!data && !isLoading) triggerFetch(undefined, true);
        if (pathname !== "/cart") setOpen(true);
    }, [isMobile, data, isLoading, pathname, triggerFetch]);

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleCheckout = async () => {
        if (!token) {
            navigate("/login");
        }

        const productIds = data?.result.items.map((item) => item._id!);

        const orderPayload = {
            items: productIds!,
            subTotal: data!.result.subTotal,
            discount: data?.result.discount,
            total: data!.result.total,
        };

        try {
            const result = await addOrder(orderPayload);
            const orderId = result.data?.result._id;

            if (orderId) {
                trackEvent("begin_checkout", {
                    _cart: data?.result._id,
                    _order: orderId,
                });
                navigate(`/checkout/${orderId}/delivery`);
                setOpen(false);
            }
        } catch (error) {
            console.error("Error while adding order:", error);
        }
    };

    return (
        <div>
            <IconButton
                ref={anchorRef}
                onClick={() => {
                    navigate("/cart");
                    setOpen(false);
                }}
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
            >
                <LocalMallOutlined />
                <CartBadge
                    badgeContent={count}
                    sx={{
                        "& .MuiBadge-badge": {
                            color: "white",
                            backgroundColor: "#ef4444",
                        },
                    }}
                    overlap="circular"
                />
            </IconButton>
            {!isMobile && (
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    onMouseLeave={handleClose}
                    role={undefined}
                    placement="bottom-end"
                    transition
                    disablePortal
                    sx={{ zIndex: 999 }}
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === "bottom-end"
                                        ? "left top"
                                        : "top right",
                            }}
                        >
                            <Paper
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    minWidth: "450px",
                                }}
                            >
                                <div className="flex items-end justify-between text-lg font-semibold p-4 bg-white">
                                    <h3>Your Cart</h3>
                                    <div>
                                        <span className="text-sm text-gray-500">
                                            Cart Total
                                        </span>{" "}
                                        <span className="text-xl">
                                            ${data?.result.total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <Divider />

                                <Loading isLoading={isLoading}>
                                    <div className="flex flex-col py-4 space-y-4 bg-[#EFEFF0] min-h-24 max-h-96 overflow-y-scroll">
                                        {data?.result.items.map((item) => (
                                            <div
                                                key={item._id}
                                                className="bg-white p-4 space-y-2"
                                            >
                                                <p>
                                                    {item.quantity} item
                                                    {item.quantity > 1 &&
                                                        "s"}{" "}
                                                    from{" "}
                                                    <span className="font-semibold">
                                                        {item._product.brand}
                                                    </span>
                                                </p>
                                                <Link
                                                    to={`/product/${item._product._id}`}
                                                    onClick={() =>
                                                        setOpen(false)
                                                    }
                                                    className="flex justify-between space-x-4"
                                                >
                                                    <img
                                                        src={`${item._product.imageUrl[0]}?imwidth=100`}
                                                        className="w-20 h-20 border object-top object-cover"
                                                        alt={
                                                            item._product.title
                                                        }
                                                    />
                                                    <div className="flex-1 text-gray-600 text-sm">
                                                        <p>
                                                            {item.quantity}{" "}
                                                            &times;{" "}
                                                            {
                                                                item._product
                                                                    .title
                                                            }
                                                        </p>
                                                        <p>Size: {item.size}</p>
                                                    </div>
                                                    <p className="text-xl font-semibold">
                                                        $
                                                        {item.total?.toFixed(2)}
                                                    </p>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </Loading>

                                <Divider />
                                <div className="flex justify-between p-4 bg-white">
                                    <Button
                                        onClick={() => {
                                            navigate("/cart");
                                            setOpen(false);
                                        }}
                                    >
                                        Show cart
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleCheckout}
                                        disabled={addLoading || isLoading}
                                    >
                                        Checkout
                                    </Button>
                                </div>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            )}
        </div>
    );
};

export default CartIcon;
