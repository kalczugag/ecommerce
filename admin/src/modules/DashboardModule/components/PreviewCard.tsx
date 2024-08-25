import Box from "@/components/Box";
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

const chartdata = [
    {
        date: "Jan 22",
        income: 2890,
    },
    {
        date: "Feb 22",
        income: 2756,
    },
    {
        date: "Mar 22",
        income: 3322,
    },
    {
        date: "Apr 22",
        income: 3470,
    },
    {
        date: "May 22",
        income: 3475,
    },
    {
        date: "Jun 22",
        income: 3129,
    },
    {
        date: "Jul 22",
        income: 3490,
    },
    {
        date: "Aug 22",
        income: 2903,
    },
    {
        date: "Sep 22",
        income: 2643,
    },
    {
        date: "Oct 22",
        income: 2837,
    },
    {
        date: "Nov 22",
        income: 2954,
    },
    {
        date: "Dec 22",
        income: 3239,
    },
];

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

const PreviewCard = () => {
    return (
        <Box className="flex items-center w-full">
            <ResponsiveContainer height={300}>
                <AreaChart
                    width={730}
                    height={250}
                    data={chartdata}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient
                            id="incomeColor"
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
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#3B7DDD"
                        fillOpacity={1}
                        fill="url(#incomeColor)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default PreviewCard;
