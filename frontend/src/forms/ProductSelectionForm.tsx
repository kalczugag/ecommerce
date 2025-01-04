import { Field } from "react-final-form";
import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Box,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import type { Item } from "@/types/Order";
import type { Product } from "@/types/Product";

interface ProductCheckboxProps {
    product: Product;
    selectedProducts: string[];
    onChange: (value: string[]) => void;
}

const ProductCheckbox = ({
    product,
    selectedProducts,
    onChange,
}: ProductCheckboxProps) => {
    const isChecked = selectedProducts.includes(product._id!);

    const handleChange = () => {
        const updatedValue = isChecked
            ? selectedProducts.filter((id) => id !== product._id)
            : [...selectedProducts, product._id];

        onChange(updatedValue as string[]);
    };

    return (
        <FormControlLabel
            control={<Checkbox sx={{ display: "none" }} checked={isChecked} />}
            label={
                <Card
                    variant="outlined"
                    sx={{
                        display: "flex",
                        mb: 2,
                        outline: isChecked ? "2px solid #1976d2" : "none",
                    }}
                >
                    <CardActionArea onClick={handleChange}>
                        <Box display="flex" alignItems="center" padding={2}>
                            <CardContent>
                                <Typography variant="h6">
                                    {product.title}
                                </Typography>
                                <Typography variant="body2">
                                    {product.description}
                                </Typography>
                                <Typography variant="subtitle1" color="primary">
                                    ${product.price.toFixed(2)}
                                </Typography>
                            </CardContent>
                        </Box>
                    </CardActionArea>
                </Card>
            }
        />
    );
};

interface StepProps {
    items: Item[];
}

const ProductSelectionForm = ({ items }: StepProps) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
            maxWidth="600px"
            margin="auto"
        >
            <Field name="selectedProducts" initialValue={[]}>
                {({ input }) =>
                    items.map((item) => (
                        <ProductCheckbox
                            key={item._id}
                            product={item._product}
                            selectedProducts={input.value}
                            onChange={input.onChange}
                        />
                    ))
                }
            </Field>
        </Box>
    );
};

export default ProductSelectionForm;
