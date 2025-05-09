import { useCallback, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useCart from "@/hooks/useCart";
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
} from "@mui/material";
import { LocalMallOutlined } from "@mui/icons-material";
import Loading from "../Loading";
import MouseLeaveListener from "../MouseLeaveListener";

interface CartIconProps {
    count: number;
    isMobile: boolean;
}

const CartBadge = styled(Badge)`
    & .${badgeClasses.badge} {
        top: -12px;
        right: -6px;
    }
`;

const CartIcon = ({ count, isMobile }: CartIconProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const { data, handleCheckout, loading, isEmpty } = useCart(open);

    const handleOpen = useCallback(() => {
        if (isMobile || pathname.startsWith("/checkout")) return;
        if (pathname !== "/cart") setOpen(true);
    }, [isMobile, pathname]);

    const handleClose = () => setOpen(false);

    return (
        <MouseLeaveListener onMouseLeave={handleClose}>
            <div>
                {isMobile ? (
                    <IconButton
                        ref={anchorRef}
                        onClick={() => {
                            navigate("/cart");
                            setOpen(false);
                        }}
                        onMouseOver={handleOpen}
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
                ) : (
                    <Button
                        ref={anchorRef}
                        onClick={() => {
                            navigate("/cart");
                            setOpen(false);
                        }}
                        onMouseOver={handleOpen}
                        color="inherit"
                        startIcon={<LocalMallOutlined />}
                    >
                        Cart
                        <CartBadge
                            badgeContent={count}
                            sx={{
                                "& .MuiBadge-badge": {
                                    color: "white",
                                    backgroundColor: "#ef4444",
                                    right: -10,
                                },
                            }}
                            overlap="circular"
                        />
                    </Button>
                )}

                {!isMobile && (
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
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

                                    <Loading isLoading={loading.get}>
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
                                                            {
                                                                item._product
                                                                    .brand
                                                            }
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
                                                                item._product
                                                                    .title
                                                            }
                                                        />
                                                        <div className="flex-1 text-gray-600 text-sm">
                                                            <p>
                                                                {item.quantity}{" "}
                                                                &times;{" "}
                                                                {
                                                                    item
                                                                        ._product
                                                                        .title
                                                                }
                                                            </p>
                                                            <p>
                                                                Size:{" "}
                                                                {item.size}
                                                            </p>
                                                        </div>
                                                        <p className="text-xl font-semibold">
                                                            $
                                                            {item.total?.toFixed(
                                                                2
                                                            )}
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
                                            loading={loading.add}
                                            loadingPosition="end"
                                            disabled={loading.get || isEmpty}
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
        </MouseLeaveListener>
    );
};

export default CartIcon;
