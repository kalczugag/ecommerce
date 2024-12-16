import { Skeleton } from "@mui/material";

const OrderTotalSkeleton = () => {
    return (
        <div className="flex flex-col w-64">
            <div className="flex justify-between">
                <Skeleton variant="text" width={80} />
                <Skeleton variant="text" width={60} />
            </div>
            <div className="flex justify-between">
                <Skeleton variant="text" width={80} />
                <Skeleton variant="text" width={60} />
            </div>
            <div className="flex justify-between">
                <Skeleton variant="text" width={80} />
                <Skeleton variant="text" width={60} />
            </div>
            <div className="flex justify-between mt-3">
                <Skeleton variant="text" width={80} />
                <Skeleton variant="text" width={80} />
            </div>
            <Skeleton variant="text" width={120} />
        </div>
    );
};

export default OrderTotalSkeleton;
