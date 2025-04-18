import type { Product } from "@/types/Product";
import { Image } from "@/components/TableFields";
import { Title } from "@/components/TableFields";
import ActionButtons from "@/components/Table/ActionButtons";

interface RowProps extends Product {
    isLoading: boolean;
    handleDelete: () => void;
}

export const sortConfig: SortConfigProps[] = [
    {
        label: "Category",
        criteria: "topLevelCategory.name",
        items: [
            {
                label: "Men",
                value: "Men",
            },
            { label: "Women", value: "Women" },
        ],
    },
    {
        label: "Availability",
        criteria: "filter.quantity",
        items: [
            { label: "more than 10", value: { $gt: 10 } },
            { label: "less than 10", value: { $lt: 10 } },
        ],
    },
    {
        label: "Sort By Price",
        criteria: "sort",
        items: [
            { label: "Low to high", value: "price" },
            { label: "High to low", value: "-price" },
        ],
    },
];

export const tableConfig = [
    {
        label: "Image",
        render: (row: RowProps) => <Image src={row.imageUrl[0]} alt="Image" />,
    },
    {
        label: "Title",
        render: (row: RowProps) => (
            <Title title={row.title} subtitle={row.brand} />
        ),
    },
    {
        label: "Category",
        render: (row: RowProps) => row.thirdLevelCategory?.name || "",
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
