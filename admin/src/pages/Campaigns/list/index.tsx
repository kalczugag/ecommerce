import { createColumnHelper } from "@tanstack/react-table";
import {
    useGetCampaignsGlobalSummaryQuery,
    useLazyGetAllCampaignsQuery,
} from "@/store";
import { useTitle } from "@/hooks/useTitle";
import CampaignsListModule from "@/modules/CampaignsModule/CampaignsListModule";
import type { FeaturedCampaign } from "@/types/FeaturedCampaign";
import moment from "moment";
import { Chip, Stack } from "@mui/material";
import TableActions from "@/components/Table2/components/TableActions";

const columnHelper = createColumnHelper<FeaturedCampaign>();

const columns = [
    columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
    }),
    columnHelper.display({
        id: "period",
        cell: (info) => {
            const start = moment(info.row.original.startDate).format(
                "DD/MM/YYYY"
            );
            const end = moment(info.row.original.endDate).format("DD/MM/YYYY");

            return (
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    divider={<span>-</span>}
                >
                    <Chip
                        label={start}
                        variant="outlined"
                        size="small"
                        color="primary"
                    />
                    <Chip
                        label={end}
                        variant="outlined"
                        size="small"
                        color="secondary"
                    />
                </Stack>
            );
        },
    }),
    columnHelper.accessor((row) => `${row.discount}%`, {
        header: "Discount",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
            <Chip
                label={info.getValue()}
                color={info.getValue() === "active" ? "success" : "default"}
                size="small"
            />
        ),
    }),
    columnHelper.accessor("hidden", {
        header: "Hidden",
        cell: (info) => (
            <Chip
                label={info.getValue() ? "Yes" : "No"}
                size="small"
                variant="outlined"
            />
        ),
    }),
    columnHelper.display({
        id: "actions",
        cell: ({ row }) => <ActionCell row={row} />,
    }),
];

const ActionCell = ({ row }: { row: any }) => {
    const handleDelete = (id: string) => {
        alert(
            `_id: ${id}\n\nCampaign deletion is disabled for now. Please check the code comments.`
        );
    };

    return (
        <TableActions id={row.original._id || ""} handleDelete={handleDelete} />
    );
};

const CampaignsList = () => {
    useTitle("Campaigns - List");

    const { data: analyticsData, isLoading } =
        useGetCampaignsGlobalSummaryQuery();

    return (
        <CampaignsListModule
            data={analyticsData?.result}
            isLoading={isLoading}
            columns={columns}
            queryFn={useLazyGetAllCampaignsQuery}
        />
    );
};

export default CampaignsList;
