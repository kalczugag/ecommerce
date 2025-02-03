import type { TableColumnProps } from "@/modules/CrudModule";
import { IconButton, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Field, Form } from "react-final-form";
import { compose, maxValue, minValue, required } from "@/utils/validators";
import type { Product } from "@/types/Product";

interface RowProps extends Product {
    handleAddProduct: (values: any) => void;
    submitForm: any;
    isLoading: boolean;
}

export const tableConfig: TableColumnProps<RowProps>[] = [
    {
        label: "id",
        render: (row) => row._id,
    },
    {
        label: "item",
        render: (row) => row.title,
    },
    {
        label: "Price",
        render: (row) => `$${row.price.toFixed(2)}`,
    },
    {
        label: "Quantity",
        render: (row) => (
            <Form
                onSubmit={row.handleAddProduct}
                render={({ handleSubmit, form }) => {
                    row.submitForm = form.submit;

                    return (
                        <form onSubmit={handleSubmit}>
                            <Field
                                name={`${row._id}.quantity`}
                                validate={compose(
                                    required,
                                    minValue(1),
                                    maxValue(row.quantity || 1)
                                )}
                            >
                                {(props) => (
                                    <TextField
                                        {...props.input}
                                        type="number"
                                        variant="standard"
                                        slotProps={{
                                            htmlInput: {
                                                max: row.quantity,
                                                min: 1,
                                            },
                                        }}
                                        error={
                                            props.meta.error &&
                                            props.meta.touched
                                        }
                                        helperText={
                                            props.meta.error &&
                                            props.meta.touched
                                                ? props.meta.error
                                                : null
                                        }
                                        disabled={row.isLoading}
                                        fullWidth
                                    />
                                )}
                            </Field>
                        </form>
                    );
                }}
            />
        ),
    },
    {
        label: "Add Item",
        render: (row) => (
            <IconButton
                onClick={() => row.submitForm?.()}
                disabled={row.isLoading}
            >
                <Add />
            </IconButton>
        ),
    },
];
