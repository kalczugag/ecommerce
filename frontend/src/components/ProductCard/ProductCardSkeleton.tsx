import { Skeleton } from "@mui/material";

const ProductCardSkeleton = () => {
    return (
        <div className="flex flex-col">
            <Skeleton variant="rectangular" height={280} width={180} />
            <div className="flex flex-col py-4 w-full">
                <Skeleton width={150} />
                <Skeleton width="80%" />
                <Skeleton width={100} />
                <Skeleton width={80} />
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
