import UnderlineLink from "@/components/UnderlineLink";
import type { Item, Shipment } from "@/types/Order";
import type { TableColumnProps } from "@/modules/CrudModule";
import { Field } from "react-final-form";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";

interface RowProps extends Item {
    shipments: Shipment[];
    isLoading: boolean;
    handleSplit: () => void;
}

export const tableConfig: TableColumnProps<RowProps>[] = [
    {
        label: "id",
        render: (row) => row._id,
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
        label: "Quantity To Move",
        render: (row) => (
            <Field name="quantityToMove">
                {({ input }) => (
                    <TextField
                        {...input}
                        type="number"
                        disabled={row.isLoading}
                        fullWidth
                    />
                )}
            </Field>
        ),
    },
    {
        label: "Move To Shipment",
        render: (row) => (
            <Field name="moveToShipment" type="select">
                {({ input }) => (
                    <FormControl disabled={row.isLoading} fullWidth>
                        <Select {...input}>
                            {row.shipments.map((shipment, index) => (
                                <MenuItem
                                    key={shipment._id}
                                    value={shipment._id}
                                >
                                    {index}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </Field>
        ),
    },
];
