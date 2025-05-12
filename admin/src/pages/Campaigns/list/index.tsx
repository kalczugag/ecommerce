import {
    useGetCampaignsGlobalSummaryQuery,
    useGetAllCampaignsQuery,
} from "@/store";
import { useTitle } from "@/hooks/useTitle";
import usePagination from "@/hooks/usePagination";
import useSortedData from "@/hooks/useSortedData";
import useDebounce from "@/hooks/useDebounce";
import CampaignsModule from "@/modules/CampaignsModule";
import NotFound from "@/components/NotFound";
import SearchItem from "@/components/SearchItem";
import SortForm from "@/forms/SortForm";
import { sortConfig, tableConfig } from "./tableConfig";

const CampaignsList = () => {
    useTitle("Campaigns");
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
        <CampaignsModule
            data={analyticsData?.result}
            config={config}
            isLoading={isLoading}
            formElements={
                <div className="space-y-4">
                    <SearchItem
                        handleSubmit={handleSearch}
                        placeholder="Search"
                    />
                    <SortForm config={sortConfig} handleSubmit={handleSort} />
                </div>
            }
        />
    );
};

export default CampaignsList;
