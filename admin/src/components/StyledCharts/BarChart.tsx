import { BarChart as Chart } from "@mui/x-charts";

interface BarLineChartProps {
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

const BarChart = ({ data, colors }: BarLineChartProps) => {
    const dd = data.map((item) => ({
        month: item.date,
        pageViews: item.value,
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
