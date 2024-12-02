import { Skeleton } from "@mui/material";

const SummaryCardSkeleton = ({ width = 100 }: { width?: number }) => {
    return (
        <div className="flex flex-col">
            <Skeleton variant="text" width={width} />
            <Skeleton variant="text" width={100} />
        </div>
    );
};

export default SummaryCardSkeleton;
