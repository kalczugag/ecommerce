import { Skeleton } from "@mui/material";
import SummaryCardSkeleton from "../SummaryCard/SummaryCardSkeleton";

const OrderListItemSkeleton = () => {
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 justify-between md:space-y-0 md:items-center md:flex-row">
                <Skeleton variant="text" width={250} />
                <Skeleton variant="rectangular" width={80} height={36} />
            </div>
            <div className="space-y-10">
                <div className="flex flex-row space-x-8">
                    <SummaryCardSkeleton />
                    <SummaryCardSkeleton />
                    <SummaryCardSkeleton />
                </div>
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0">
                    <SummaryCardSkeleton width={150} />
                    <div className="flex space-x-4">
                        <Skeleton
                            variant="rectangular"
                            width={180}
                            height={220}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderListItemSkeleton;
