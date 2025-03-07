import { LineChart as Chart } from "@mui/x-charts/LineChart";
import { generateRandomData } from "@/utils/generateMonthDays";

interface SparkLineChartProps {
    data: any[];
    monthDays: any[];
    colors: {
        primary: string;
        secondary: string;
        tetriary: string;
    };
}

const LineChart = ({ data, monthDays, colors }: SparkLineChartProps) => {
    const randomData = generateRandomData(monthDays.length);

    const dd = monthDays.map((month) => ({
        month,
        direct: data[Math.floor(Math.random() * data.length)],
        referral: randomData[Math.floor(Math.random() * randomData.length)],
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
                    id: "Direct",
                    label: "Direct",
                    dataKey: "direct",
                    stack: "traffic",
                    showMark: false,
                    color: colors.primary,
                },
                {
                    id: "Referral",
                    label: "Referral",
                    dataKey: "referral",
                    stack: "traffic",
                    showMark: false,
                    color: colors.secondary,
                },
            ]}
            height={300}
            margin={{ top: 15 }}
            legend={{ hidden: true }}
        />
    );
};

export default LineChart;
