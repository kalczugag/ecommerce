import { useAppSelector } from "@/hooks/useStore";
import { useGetDeliveryMethodsQuery } from "@/store";
import { findProviderById } from "@/utils/helpers";
import {
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
    { name: "Card type:", detail: "Visa" },
    { name: "Card holder:", detail: "Mr. John Smith" },
    { name: "Card number:", detail: "xxxx-xxxx-xxxx-1234" },
    { name: "Expiry date:", detail: "04/2024" },
];

const Review = () => {
    const {
        total,
        subTotal,
        paymentInfo,
        _deliveryMethod,
        products,
        userData,
    } = useAppSelector((state) => state.checkout);

    const { data, isSuccess } = useGetDeliveryMethodsQuery();

    const deliveryProvider =
        isSuccess && data
            ? findProviderById(data.result, _deliveryMethod)
            : null;

    const { street, city, state, postalCode, country } =
        userData?.address ?? {};
    const fullAddress = `${street}, ${city}, ${state}, ${postalCode}, ${country}`;

    return (
        <Stack spacing={2}>
            <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText
                        primary="Products"
                        secondary={`${products.length} selected`}
                    />
                    <Typography variant="body2">
                        ${subTotal.toFixed(2)}
                    </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Shipping" secondary="Plus taxes" />
                    <Typography variant="body2">
                        {total > 100
                            ? "Free"
                            : deliveryProvider &&
                              `$${deliveryProvider.price.toFixed(2)}`}
                    </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        ${total.toFixed(2)}
                    </Typography>
                </ListItem>
                <Divider />
                <Stack
                    direction="column"
                    divider={<Divider flexItem />}
                    spacing={2}
                    sx={{ my: 2 }}
                >
                    <div>
                        <Typography variant="subtitle2" gutterBottom>
                            Shipment details
                        </Typography>
                        <Typography gutterBottom>
                            {userData?.firstName} {userData?.lastName}
                        </Typography>
                        <Typography
                            gutterBottom
                            sx={{ color: "text.secondary" }}
                        >
                            {fullAddress}
                        </Typography>
                    </div>
                    {paymentInfo && (
                        <div>
                            <Typography variant="subtitle2" gutterBottom>
                                Payment details
                            </Typography>
                            <Grid container>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    useFlexGap
                                    sx={{ width: "100%", mb: 1 }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{ color: "text.secondary" }}
                                    >
                                        Card type:
                                    </Typography>
                                    <Typography variant="body2">
                                        {paymentInfo.brand}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    useFlexGap
                                    sx={{ width: "100%", mb: 1 }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{ color: "text.secondary" }}
                                    >
                                        Card holder:
                                    </Typography>
                                    <Typography variant="body2">
                                        {paymentInfo.cardHolder}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    useFlexGap
                                    sx={{ width: "100%", mb: 1 }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{ color: "text.secondary" }}
                                    >
                                        Card number:
                                    </Typography>
                                    <Typography variant="body2">
                                        {`xxxx-xxxx-xxxx-${paymentInfo.last4}`}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    useFlexGap
                                    sx={{ width: "100%", mb: 1 }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{ color: "text.secondary" }}
                                    >
                                        Expiry date:
                                    </Typography>
                                    <Typography variant="body2">
                                        {paymentInfo.expDate}
                                    </Typography>
                                </Stack>
                            </Grid>
                        </div>
                    )}
                </Stack>
            </List>
        </Stack>
    );
};

export default Review;
