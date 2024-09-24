import Box from "@/components/Box";
import Loading from "@/components/Loading";
import { Info } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

export interface SummaryCardProps {
    title: string;
    value: number;
    prefix?: string;
    summary: number;
    icon: JSX.Element;
    isLoading: boolean;
}

const SummaryCard = ({
    title = "",
    value = 0,
    prefix,
    icon,
    summary = 0,
    isLoading,
}: SummaryCardProps) => {
    return (
        <Loading isLoading={isLoading}>
            <Box className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <h5 className="font-bold text-gray-500 dark:text-gray-400">
                        {title}
                    </h5>
                    <span className="flex items-center justify-center text-blue-500 bg-blue-100 rounded-full p-1 w-10 h-10 dark:bg-slate-700 dark:text-text-dark">
                        {icon}
                    </span>
                </div>
                <div>
                    <h3 className="text-xl">
                        {prefix}
                        {value}
                    </h3>
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {summary ? (
                            <>
                                <span
                                    className={`font-bold ${
                                        summary < 0
                                            ? "text-red-500"
                                            : "text-green-500"
                                    }`}
                                >
                                    {summary}%
                                </span>{" "}
                                Since Last week
                            </>
                        ) : (
                            <Tooltip title="Comparison to last week is not available. This field displays the percentage change compared to the previous weeks data.">
                                <p className="flex items-center space-x-1 underline">
                                    <span>N/A</span>
                                    <Info sx={{ fontSize: "16px" }} />
                                </p>
                            </Tooltip>
                        )}
                    </p>
                </div>
            </Box>
        </Loading>
    );
};

export default SummaryCard;
