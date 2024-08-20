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
            row.address &&
            row.address.city &&
            row.address.street &&
            row.address.postalCode &&
            row.address.country ? (
                <Address
                    street={row.address.street}
                    city={row.address.city}
                    postalCode={row.address.postalCode}
                    country={row.address.country}
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
                id={row._id || ""}
                disabled={row.isLoading}
                handleDelete={row.handleDelete}
            />
        ),
    },
];
