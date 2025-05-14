import { useNavigate } from "react-router-dom";
import {
    useGetCampaignsGlobalSummaryQuery,
    useGetAllCampaignsQuery,
} from "@/store";
import { useTitle } from "@/hooks/useTitle";
import usePagination from "@/hooks/usePagination";
import useSortedData from "@/hooks/useSortedData";
import useDebounce from "@/hooks/useDebounce";
import { Button } from "@mui/material";
import CampaignsListModule from "@/modules/CampaignsModule/CampaignsListModule";
import NotFound from "@/components/NotFound";
import SearchItem from "@/components/SearchItem";
import SortForm from "@/forms/SortForm";
import { sortConfig, tableConfig } from "./tableConfig";

const CampaignsList = () => {
    useTitle("Campaigns");
    const navigate = useNavigate();
    const [pagination] = usePagination();
    const { sortCriteria, setSortCriteria } = useSortedData();

    const { data: campaignsData, isFetching } = useGetAllCampaignsQuery({
        ...pagination,
        ...sortCriteria,
    });
    const {
        data: analyticsData,
        isLoading,
        isError,
    } = useGetCampaignsGlobalSummaryQuery();

    const handleSort = (sortValues: any) => {
        setSortCriteria(sortValues);
    };

    const handleSearch = useDebounce((searchTerm: { search: string }) => {
        const filter = { $text: { $search: searchTerm.search } };

        setSortCriteria({ filter });
    }, 250);

    if (isError || (!isLoading && !analyticsData?.result)) return <NotFound />;

    const config = {
        tableConfig,
        tableData: campaignsData?.result || [],
        total: campaignsData?.count || 0,
        isLoading: isFetching,
    };

    return (
        <CampaignsListModule
            data={analyticsData?.result}
            config={config}
            isLoading={isLoading}
            formElements={
                <div className="space-y-4">
                    <SearchItem
                        handleSubmit={handleSearch}
                        placeholder="Search"
                    />
                    <div className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row">
                        <SortForm
                            config={sortConfig}
                            handleSubmit={handleSort}
                        />
                        <Button
                            variant="contained"
                            onClick={() => navigate("/campaigns/add")}
                        >
                            Add Campaign
                        </Button>
                    </div>
                </div>
            }
        />
    );
};

export default CampaignsList;
