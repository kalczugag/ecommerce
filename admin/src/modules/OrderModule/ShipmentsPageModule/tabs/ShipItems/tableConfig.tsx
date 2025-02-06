import { Field } from "react-final-form";
import { required, minValue, maxValue, compose } from "@/utils/validators";
import UnderlineLink from "@/components/UnderlineLink";
import type { Item, Shipment } from "@/types/Order";
import type { TableColumnProps } from "@/modules/CrudModule";
import { TextField } from "@mui/material";

interface RowProps extends Item {
    shipments: Shipment[];
    isLoading: boolean;
    handleSplit: () => void;
}

export const tableConfig: TableColumnProps<RowProps>[] = [
    {
        label: "SKU",
        render: (row) => row._product.sku,
    },
    {
        label: "item",
        render: (row) => (
            <UnderlineLink to={`/products/${row._product._id}`}>
                {row._product.title}
            </UnderlineLink>
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
            <Field name={`${row._id}.quantityToShip`}>
                {(props) => (
                    <TextField
                        {...props.input}
                        type="number"
                        variant="standard"
                        slotProps={{ htmlInput: { max: row.quantity, min: 0 } }}
                        disabled={row.isLoading}
                        fullWidth
                    />
                )}
            </Field>
        ),
    },
];
