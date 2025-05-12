import moment from "moment";
import ActionButtons from "@/components/Table/ActionButtons";
import type { TableColumnProps } from "@/modules/CrudModule";
import type { FeaturedCampaign } from "@/types/FeaturedCampaign";
import { Chip } from "@mui/material";

interface RowProps extends FeaturedCampaign {
    isLoading: boolean;
}

export const sortConfig: SortConfigProps[] = [
    {
        label: "Sort By Date",
        criteria: "sort",
        items: [
            { label: "Newer to Older", value: "-createdAt" },
            { label: "Older to Newer", value: "createdAt" },
        ],
    },
    {
        label: "Status",
        criteria: "status",
        items: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "Scheduled", value: "scheduled" },
            { label: "Completed", value: "completed" },
        ],
    },
];

export const tableConfig: TableColumnProps<RowProps>[] = [
    {
        label: "Name",
        render: (row) => row.name,
    },
    {
        label: "Period",
        render: (row) => {
            const start = moment(row.startDate).format("DD/MM/YYYY");
            const end = moment(row.endDate).format("DD/MM/YYYY");

            return start + " - " + end;
        },
    },
    {
        label: "Discount",
        render: (row) => `${row.discount}%`,
    },
    {
        label: "Status",
        render: (row) => (
            <Chip
                label={row.status}
                color={row.status === "active" ? "success" : "default"}
            />
        ),
    },
    {
        label: "Hidden",
        render: (row) => <Chip label={row.hidden ? "Yes" : "No"} />,
    },
    {
        label: "Actions",
        render: (row) => (
            <ActionButtons
                id={row._id || ""}
                disabled={row.isLoading}
                component="button"
                element="View Campaign"
            />
        ),
    },
];
