import { Skeleton } from "@mui/material";

const OrderAddressSkeleton = () => {
    return (
        <div className="flex flex-col">
            <Skeleton variant="text" width={150} />
            <Skeleton variant="text" width={150} />
            <Skeleton variant="text" width={150} />
        </div>
    );
};

export default OrderAddressSkeleton;
