import { useGetDeliveryMethodsQuery } from "@/store";
import { useAppSelector } from "@/hooks/useStore";
import {
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import { findProviderById } from "@/utils/helpers";

const Info = () => {
    const { products, total, deliveryCost, _deliveryMethod } = useAppSelector(
        (state) => state.checkout
    );
    const { data, isSuccess } = useGetDeliveryMethodsQuery();

    const deliveryProvider =
        isSuccess && data
            ? findProviderById(data.result, _deliveryMethod)
            : null;

    const totalCost = total + (total > 100 ? 0 : deliveryCost || 0);

    return (
        <>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                Total
            </Typography>
            <Typography variant="h4" gutterBottom>
                ${totalCost.toFixed(2)}
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
                {deliveryProvider && (
                    <>
                        <Divider />
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText
                                sx={{ mr: 2 }}
                                primary="Delivery method"
                                secondary={deliveryProvider.name}
                            />
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: "medium",
                                }}
                            >
                                {total > 100
                                    ? "Free"
                                    : `$${deliveryProvider.price.toFixed(2)}`}
                            </Typography>
                        </ListItem>
                    </>
                )}
            </List>
        </>
    );
};

export default Info;
