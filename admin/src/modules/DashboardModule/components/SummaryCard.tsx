import Box from "@/components/Box";

interface SummaryCardProps {
    title: string;
    value: number;
    summary: number;
    icon: JSX.Element;
}

const SummaryCard = ({ title, value, icon, summary }: SummaryCardProps) => {
    return (
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
                <h3 className="text-xl">{value}</h3>
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span
                        className={`font-bold ${
                            summary < 0 ? "text-red-500" : "text-green-500"
                        }`}
                    >
                        {summary}%
                    </span>{" "}
                    Since Last week
                </p>
            </div>
        </Box>
    );
};

export default SummaryCard;
