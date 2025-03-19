import { LineChart as Chart } from "@mui/x-charts/LineChart";

interface SparkLineChartProps {
    data: {
        date: string;
        value: number | any;
    }[];
    colors: {
        primary: string;
        secondary: string;
        tetriary: string;
    };
}

const LineChart = ({ data, colors }: SparkLineChartProps) => {
    const dd = data.map(({ date, value }) => ({
        date,
        direct: value.direct ?? 0,
        referral: value.referral ?? 0,
        organic: value.organic ?? 0,
    }));

    return (
        <Chart
            dataset={dd}
            xAxis={[
                {
                    id: "date",
                    dataKey: "date",
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
                {
                    id: "Organic",
                    label: "Organic",
                    dataKey: "organic",
                    stack: "traffic",
                    showMark: false,
                    color: colors.tetriary,
                },
            ]}
            height={300}
            margin={{ top: 15 }}
            legend={{ hidden: true }}
        />
    );
};

export default LineChart;
