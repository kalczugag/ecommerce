import { Skeleton } from "@mui/material";

const ProductCardSkeleton = () => {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row space-x-4">
                <Skeleton variant="rectangular" width={100} height={100} />
                <div className="flex flex-col space-y-2">
                    <div className="font-semibold">
                        <Skeleton variant="text" width={100} />
                        <Skeleton variant="text" width={100} />
                    </div>
                    <div className="text-sm">
                        <Skeleton variant="text" width={100} />
                        <Skeleton variant="text" width={100} />
                        <Skeleton variant="text" width={200} />
                    </div>
                </div>
            </div>
            <Skeleton variant="text" width={80} />
        </div>
    );
};

export default ProductCardSkeleton;
