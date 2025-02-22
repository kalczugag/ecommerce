import { Field } from "react-final-form";
import UnderlineLink from "@/components/UnderlineLink";
import type { Item, Shipment } from "@/types/Order";
import type { TableColumnProps } from "@/modules/CrudModule";
import { TextField } from "@mui/material";
import { compose, required, maxValue, minValue } from "@/utils/validators";

interface RowProps extends Item {
    shipments: Shipment[];
    isLoading: boolean;
    handleSplit: () => void;
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
                name={`${row._id}.quantityToShip`}
                validate={compose(
                    required,
                    minValue(0),
                    maxValue(row.quantity)
                )}
            >
                {(props) => (
                    <TextField
                        {...props.input}
                        type="number"
                        variant="standard"
                        slotProps={{ htmlInput: { max: row.quantity, min: 0 } }}
                        error={props.meta.error && props.meta.touched}
                        helperText={
                            props.meta.error && props.meta.touched
                                ? props.meta.error
                                : null
                        }
                        disabled={row.isLoading}
                        fullWidth
                    />
                )}
            </Field>
        ),
    },
];
