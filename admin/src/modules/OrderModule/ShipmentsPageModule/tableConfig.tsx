import UnderlineLink from "@/components/UnderlineLink";
import type { Item } from "@/types/Order";
import type { TableColumnProps } from "@/modules/CrudModule";
import ActionButtons from "@/components/Table/ActionButtons";

interface RowProps extends Item {
    isLoading: boolean;
    handleEdit: () => void;
    handleDelete: () => void;
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
        label: "Total",
        render: (row) => `$${row.total.toFixed(2)}`,
    },
    {
        label: "Total",

        render: (row) => (
            <ActionButtons
                id={row._product._id || ""}
                disabled={row.isLoading}
                handleDelete={row.handleDelete}
            />
        ),
    },
];
