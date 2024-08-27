import Box from "@/components/Box";
import Loading from "@/components/Loading";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from "recharts";

interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip bg-white p-3 border border-gray-300 rounded-md dark:bg-darker dark:text-text-dark">
                <p className="label font-bold">{`Date: ${label}`}</p>
                {payload.map((item, index) => (
                    <p key={index} className="intro">
                        {`${item.name}: $${item.value}`}
                    </p>
                ))}
            </div>
        );
    }

    return null;
};

interface PreviewCardProps {
    chartData: {
        period: string;
        total: number;
    }[];
    isLoading: boolean;
}

const PreviewCard = ({ chartData, isLoading }: PreviewCardProps) => {
    return (
        <Box className="flex items-center w-full">
            <ResponsiveContainer height={300}>
                <Loading isLoading={isLoading}>
                    <AreaChart
                        width={730}
                        height={250}
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id="totalColor"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#3B7DDD"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#3B7DDD"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="period" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="total"
                            stroke="#3B7DDD"
                            fillOpacity={1}
                            fill="url(#totalColor)"
                        />
                    </AreaChart>
                </Loading>
            </ResponsiveContainer>
        </Box>
    );
};

export default PreviewCard;
