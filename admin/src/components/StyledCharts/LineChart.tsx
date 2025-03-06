import { LineChart as Chart } from "@mui/x-charts/LineChart";
import ColorSwitch from "./ColorSwitch";
import { generateRandomData } from "@/utils/generateMonthDays";

interface SparkLineChartProps {
    data: any[];
    monthDays: any[];
    baseColor: string;
}
const LineChart = ({ data, monthDays, baseColor }: SparkLineChartProps) => {
    const randomData = generateRandomData(monthDays.length);

    const dd = monthDays.map((month) => ({
        month,
        direct: data[Math.floor(Math.random() * data.length)],
        referral: randomData[Math.floor(Math.random() * randomData.length)],
    }));

    const gradientId = `gradient-${baseColor}`;

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
                    color: "#929EB6",
                    area: true,
                },
                {
                    id: "Referral",
                    label: "Referral",
                    dataKey: "referral",
                    stack: "traffic",
                    showMark: false,
                    color: "#9c27b0",
                    area: true,
                },
            ]}
            height={300}
            margin={{ top: 15 }}
            legend={{ hidden: true }}
        >
            <ColorSwitch colorId="direct" color={baseColor} />
        </Chart>
    );
};

export default LineChart;
