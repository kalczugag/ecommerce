import type { Product } from "@/types/Product";
import { Image } from "@/components/TableFields";
import { Title } from "@/components/TableFields";
import ActionButtons from "@/components/Table/ActionButtons";

interface RowProps extends Product {
    isLoading: boolean;
    handleDelete: () => void;
}

export const sortConfig = [
    {
        label: "Category",
        items: [
            { label: "dresses", value: "dress" },
            { label: "shoes", value: "shoes" },
        ],
    },
    {
        label: "Availability",
        items: [
            { label: "more than 10", value: "more than 10" },
            { label: "less than 10", value: "less than 10" },
        ],
    },
    {
        label: "Sort By Price",
        items: [
            { label: "Low to high", value: "asc" },
            { label: "High to low", value: "desc" },
        ],
    },
];

export const tableConfig = [
    {
        label: "Image",
        render: (row: RowProps) => <Image src={row.imageUrl} alt="Image" />,
    },
    {
        label: "Title",
        render: (row: RowProps) => (
            <Title title={row.title} subtitle={row.brand} />
        ),
    },
    {
        label: "Category",
        render: (row: RowProps) => row.thirdLevelCategory,
    },
    {
        label: "Price",
        render: (row: RowProps) => <span>${row.price}</span>,
    },
    {
        label: "Quantity",
        render: (row: RowProps) => <span>{row.quantity} pcs. </span>,
    },
    {
        label: "Actions",
        render: (row: RowProps) => (
            <ActionButtons
                id={row._id!}
                disabled={row.isLoading}
                handleDelete={row.handleDelete}
            />
        ),
    },
];
