import { useMemo } from "react";
import { Field } from "react-final-form";
import { createColumnHelper } from "@tanstack/react-table";
import { useLazyGetAllProductsQuery, useDeleteProductMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import {
    Avatar,
    Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import CrudModule from "@/modules/CrudModule";
import TableActions from "@/components/Table2/components/TableActions";
import type { Product } from "@/types/Product";
import moment from "moment";
import SearchItem from "@/components/SearchItem";

const columnHelper = createColumnHelper<Product>();

const columns = [
    columnHelper.accessor("title", {
        header: "Product",
        cell: (info) => (
            <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                    variant="square"
                    src={info.row.original.imageUrl[0]}
                    alt="product image"
                    sx={{ width: 60, height: 60, borderRadius: 2 }}
                />
                <Stack spacing={0.3}>
                    <Typography variant="body2" fontWeight={500}>
                        {info.getValue()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {info.row.original.thirdLevelCategory.name}
                    </Typography>
                </Stack>
            </Stack>
        ),
        sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("createdAt", {
        header: "Create at",
        cell: (info) => {
            const date = moment(info.getValue()).format("DD MMM YYYY");
            const time = moment(info.getValue()).format("hh:mm A");

            return (
                <Stack direction="column" spacing={0.3}>
                    <Typography variant="body2">{date}</Typography>
                    <Typography
                        variant="subtitle2"
                        fontSize={12}
                        color="text.secondary"
                    >
                        {time}
                    </Typography>
                </Stack>
            );
        },
        sortingFn: "datetime",
    }),
    columnHelper.accessor("quantity", {
        header: "Stock",
        cell: (info) => {
            const percentage = Math.floor(((info.getValue() ?? 0) / 150) * 100);
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
                    <Box sx={{ color: "text.secondary" }}>
                        {info.getValue()} in stock
                    </Box>
                </Stack>
            );
        },
        sortingFn: "basic",
    }),
    columnHelper.accessor((row) => `$${row.price.toFixed(2)}`, {
        header: "Price",
        cell: (info) => info.getValue(),
        sortingFn: "basic",
    }),
    columnHelper.display({
        id: "actions",
        cell: ({ row }) => <ActionCell row={row} />,
        enableSorting: false,
    }),
];

const ActionCell = ({ row }: { row: any }) => {
    const { handleMutation } = useHandleMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const handleDelete = (id: string) => {
        alert(
            "Delete functionality is disabled for now. Please check the code comments."
        );
        // handleMutation({
        //     values: id,
        //     mutation: deleteProduct,
        //     successMessage: "Product deleted successfully",
        //     errorMessage: "Failed to delete product",
        // });
    };

    return (
        <TableActions id={row.original._id || ""} handleDelete={handleDelete} />
    );
};

const ProductsList = () => {
    useTitle("Products - List");

    const filterElements = useMemo(
        () => (
            <Stack direction="row" spacing={2}>
                <Field name="stock" type="select">
                    {({ input }) => (
                        <FormControl>
                            <InputLabel>Stock</InputLabel>
                            <Select
                                {...input}
                                multiple
                                input={<OutlinedInput />}
                            ></Select>
                        </FormControl>
                    )}
                </Field>
                <Field name="search">{({ input }) => <SearchItem />}</Field>
            </Stack>
        ),
        []
    );

    return (
        <CrudModule
            actionForm={filterElements}
            columns={columns}
            queryFn={useLazyGetAllProductsQuery}
        />
    );
};

export default ProductsList;
