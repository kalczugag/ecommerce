import moment from "moment";
import { Box, Stack, Typography } from "@mui/material";
import type { Product } from "@/types/Product";
import TableMenu from "@/components/Table/Menu";

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
        label: "Stock",
        criteria: "filter.quantity",
        items: [
            { label: "In stock", value: { $gt: 70 } },
            { label: "Low stock", value: { $lt: 30 } },
            { label: "Out of stock", value: { $lte: 0 } },
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
        label: "Product",

        render: (row: RowProps) => (
            <Stack direction="row" spacing={2} alignItems="center">
                <Box
                    component="img"
                    sx={{
                        width: "4rem",
                        height: "4rem",
                        borderRadius: "8px",
                        objectFit: "cover",
                        objectPosition: "top",
                    }}
                    src={`${row.imageUrl[0]}?imwidth=96`}
                    alt={row.title}
                />
                <Stack direction="column">
                    <Typography variant="body2">{row.title}</Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary", fontSize: "0.75rem" }}
                    >
                        {row.thirdLevelCategory.name}
                    </Typography>
                </Stack>
            </Stack>
        ),
    },
    {
        label: "Created at",
        render: (row: RowProps) => {
            const date = moment(row.createdAt).format("DD MMM YYYY");
            const time = moment(row.createdAt).format("hh:mm A");

            return (
                <Stack direction="column">
                    <Typography variant="body2" fontWeight="normal">
                        {date}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary", fontSize: 12 }}
                    >
                        {time}
                    </Typography>
                </Stack>
            );
        },
    },
    {
        label: "Stock",
        render: (row: RowProps) => {
            const percentage = Math.floor(((row?.quantity || 0) / 150) * 100);
            const color =
                percentage > 50 ? "green" : percentage < 50 ? "orange" : "red";

            return (
                <Stack direction="column" alignItems="center" spacing={1}>
                    <Box
                        sx={{
                            width: "100%",
                            minWidth: "100px",
                            height: 6,
                            borderRadius: 4,
                            overflow: "hidden",
                        }}
                        className="bg-[#E0E0E0] dark:bg-dark-primary"
                    >
                        <Box
                            sx={{
                                width: `${percentage}%`,
                                height: "100%",
                                backgroundColor: color,
                            }}
                        />
                    </Box>
                    <Box sx={{ color: "text.secondary", fontSize: 12 }}>
                        {row.quantity} in stock
                    </Box>
                </Stack>
            );
        },
    },
    {
        label: "Price",
        render: (row: RowProps) => `$${row.price.toFixed(2)}`,
    },
    {
        label: "Actions",
        render: (row: RowProps) => (
            <TableMenu id={row._id || ""} handleDelete={row.handleDelete} />
        ),
    },
];
