import type { User } from "@/types/User";
import { Address } from "@/components/TableFields";
import { Title } from "@/components/TableFields";
import ActionButtons from "@/components/Table/ActionButtons";

interface RowProps extends User {
    isLoading: boolean;
    handleDelete: () => void;
}

export const sortConfig = [
    {
        label: "Sort By",
        items: [
            { label: "A-Z", value: "asc" },
            { label: "Z-A", value: "desc" },
        ],
    },
];

export const tableConfig = [
    {
        label: "Full Name",
        render: (row: RowProps) => (
            <Title
                title={row.firstName + " " + row.lastName}
                subtitle={row.email}
            />
        ),
    },
    {
        label: "Address",
        render: (row: RowProps) =>
            row.address && row.city && row.postalCode && row.country ? (
                <Address
                    address={row.address}
                    city={row.city}
                    postalCode={row.postalCode}
                    country={row.country}
                />
            ) : (
                <span>No address</span>
            ),
    },
    {
        label: "Phone",
        render: (row: RowProps) => row.phone || "No phone number",
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
