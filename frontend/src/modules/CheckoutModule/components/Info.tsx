import { useAppSelector } from "@/hooks/useStore";
import {
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";

const Info = () => {
    const { products, total, _deliveryMethod } = useAppSelector(
        (state) => state.checkout
    );

    return (
        <>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                Total
            </Typography>
            <Typography variant="h4" gutterBottom>
                ${total.toFixed(2)}
            </Typography>
            <List disablePadding>
                {products.map((product) => (
                    <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
                        <ListItemText
                            sx={{ mr: 2 }}
                            primary={product._product.title}
                            secondary={product.color}
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: "medium",
                            }}
                        >
                            ${product.unitPrice.toFixed(2)}
                        </Typography>
                    </ListItem>
                ))}
                {_deliveryMethod && (
                    <>
                        <Divider />
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText
                                sx={{ mr: 2 }}
                                primary="Delivery method"
                                secondary={_deliveryMethod.name}
                            />
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: "medium",
                                }}
                            >
                                {total > 100
                                    ? "Free"
                                    : `$${_deliveryMethod.price.toFixed(2)}`}
                            </Typography>
                        </ListItem>
                    </>
                )}
            </List>
        </>
    );
};

export default Info;
