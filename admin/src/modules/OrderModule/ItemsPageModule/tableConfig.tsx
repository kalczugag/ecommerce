import UnderlineLink from "@/components/UnderlineLink";
import type { Item } from "@/types/Order";
import type { TableColumnProps } from "@/modules/CrudModule";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import EditItemDialog from "../ShipmentsPageModule/components/EditItemDialog";
import AlertDialog from "@/components/AlertDialog";

interface RowProps extends Item {
    isLoading: boolean;
    handleDelete: (id: string) => void;
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
        label: "Unit Price",
        render: (row) => `$${row.unitPrice.toFixed(2)}`,
    },
    {
        label: "Quantity",
        render: (row) => row.quantity,
    },
    {
        label: "Total",
        render: (row) => `$${row.total.toFixed(2)}`,
    },
    {
        label: "Actions",
        render: (row) => (
            <div className="flex justify-end">
                <EditItemDialog item={row} />
                <AlertDialog
                    title="Are you sure?"
                    content="You won't be able to revert this!"
                    cancel="Cancel"
                    confirm="Yes"
                    onConfirm={() => row.handleDelete(row._id || "")}
                >
                    {(props) => (
                        <IconButton
                            onClick={props.open}
                            disabled={row.isLoading}
                        >
                            <Delete />
                        </IconButton>
                    )}
                </AlertDialog>
            </div>
        ),
    },
];
