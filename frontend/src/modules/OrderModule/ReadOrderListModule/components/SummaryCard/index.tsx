import { Skeleton } from "@mui/material";

interface SummaryCardProps {
    label: string;
    value: string;
    isLoading: boolean;
    width?: number;
}

const SummaryCard = ({
    label,
    value,
    isLoading,
    width = 100,
}: SummaryCardProps) => {
    return (
        <div className="flex flex-col">
            {isLoading ? (
                <Skeleton variant="text" width={width} />
            ) : (
                <p className="font-bold">{label}</p>
            )}
            <p>{isLoading ? <Skeleton variant="text" width={100} /> : value}</p>
        </div>
    );
};

export default SummaryCard;
