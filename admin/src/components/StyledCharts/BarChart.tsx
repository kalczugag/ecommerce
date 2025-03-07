import {
    generateLastMonths,
    generateRandomData,
} from "@/utils/generateMonthDays";
import { BarChart as Chart } from "@mui/x-charts";

interface BarLineChartProps {
    data?: any[];
    colors: {
        primary: string;
        secondary: string;
        tetriary: string;
    };
}

const BarChart = ({ data, colors }: BarLineChartProps) => {
    const last6Months = generateLastMonths(6);
    const randomData = generateRandomData(last6Months.length);

    const dd = last6Months.map((month) => ({
        month,
        pageViews: randomData[Math.floor(Math.random() * randomData.length)],
    }));

    return (
        <Chart
            dataset={dd}
            xAxis={[
                {
                    id: "month",
                    dataKey: "month",
                    scaleType: "band",
                    valueFormatter: (value) => value,
                },
            ]}
            series={[
                {
                    dataKey: "pageViews",
                    label: "Page Views",
                    layout: "vertical",
                    stack: "stack",
                    color: colors.primary,
                },
            ]}
            borderRadius={10}
            height={300}
            margin={{ top: 15 }}
            legend={{ hidden: true }}
        />
    );
};

export default BarChart;
