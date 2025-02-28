import { Field } from "react-final-form";
import UnderlineLink from "@/components/UnderlineLink";
import type { Item } from "@/types/Order";
import type { TableColumnProps } from "@/modules/CrudModule";
import { TextField } from "@mui/material";
import { maxValue } from "@/utils/validators";

interface RowProps extends Item {
    isLoading: boolean;
    isShippedItem: boolean;
}

export const tableConfig: TableColumnProps<RowProps>[] = [
    {
        label: "SKU",
        render: (row) => (row._product ? row._product.sku : "-"),
    },
    {
        label: "Item",
        render: (row) =>
            row._product ? (
                <UnderlineLink to={`/products/${row._product._id}`}>
                    {row._product.title}
                </UnderlineLink>
            ) : (
                row.name
            ),
    },
    {
        label: "Price",
        render: (row) => `$${row.unitPrice.toFixed(2)}`,
    },
    {
        label: "Quantity",
        render: (row) => row.quantity,
    },
    {
        label: "Quantity To Ship",
        render: (row) => (
            <Field
                name={`${row._id}.quantity`}
                validate={maxValue(row.quantity)}
            >
                {(props) => (
                    <TextField
                        {...props.input}
                        type="number"
                        variant="standard"
                        slotProps={{
                            htmlInput: { max: row.quantity, min: row.quantity },
                        }}
                        error={props.meta.error && props.meta.touched}
                        helperText={
                            props.meta.error && props.meta.touched
                                ? props.meta.error
                                : null
                        }
                        disabled={row.isLoading || row.isShippedItem}
                        fullWidth
                    />
                )}
            </Field>
        ),
    },
];
