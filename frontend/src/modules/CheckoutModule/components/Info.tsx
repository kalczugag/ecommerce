import { List, ListItem, ListItemText, Typography } from "@mui/material";
import type { Item } from "@/types/Order";

interface InfoProps {
    totalPrice: string;
    products: Item[];
}

const Info = ({ totalPrice, products }: InfoProps) => {
    return (
        <>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                Total
            </Typography>
            <Typography variant="h4" gutterBottom>
                {totalPrice}
            </Typography>
            <List disablePadding>
                {products.map((product) => (
                    <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
                        <ListItemText
                            sx={{ mr: 2 }}
                            primary={product._product.title}
                            secondary={product.color}
                        >
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: "medium" }}
                            >
                                {product.unitPrice}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default Info;
