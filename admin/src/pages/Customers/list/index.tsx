import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation, useGetAllUsersQuery } from "@/store";
import { sortConfig, tableConfig } from "./config";
import { useTitle } from "@/hooks/useTitle";
import usePagination from "@/hooks/usePagination";
import useSortedData from "@/hooks/useSortedData";
import useDebounce from "@/hooks/useDebounce";
import CrudModule from "@/modules/CrudModule";
import SortForm from "@/forms/SortForm";
import SearchItem from "@/components/SearchItem";
import { Button } from "@mui/material";

const CustomersList = () => {
    const navigate = useNavigate();
    const [pagination] = usePagination();
    useTitle("Customers - List");

    const { sortCriteria, setSortCriteria } = useSortedData();
    const { data, isFetching } = useGetAllUsersQuery({
        ...pagination,
        ...sortCriteria,
    });

    const [deleteUser, result] = useDeleteUserMutation();

    const handleSort = (sortValues: any) => {
        setSortCriteria(sortValues);
    };

    const handleSearch = useDebounce((searchTerm: { search: string }) => {
        const filter = {
            $or: [
                { firstName: searchTerm.search },
                { phone: searchTerm.search },
                { email: searchTerm.search },
            ],
        };

        setSortCriteria({ filter });
    }, 250);

    const config = {
        tableConfig,
        tableData: data?.data || [],
        total: data?.count || 0,
        action: deleteUser,
        isLoading: isFetching || result.isLoading,
    };

    return (
        <CrudModule
            config={config}
            actionForm={
                <div className="space-y-4">
                    <SearchItem handleSubmit={handleSearch} />
                    <div className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row">
                        <SortForm
                            config={sortConfig}
                            handleSubmit={handleSort}
                        />
                        <Button
                            variant="contained"
                            onClick={() => navigate("/customers/add")}
                        >
                            Add Customer
                        </Button>
                    </div>
                </div>
            }
        />
    );
};

export default CustomersList;
