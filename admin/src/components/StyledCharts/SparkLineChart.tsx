import { SparkLineChart as Chart } from "@mui/x-charts/SparkLineChart";
import ColorSwitch from "./ColorSwitch";

interface SparkLineChartProps {
    data: number[];
    monthDays: any[];
    baseColor: string;
}

const SparkLineChart = ({
    data,
    monthDays,
    baseColor,
}: SparkLineChartProps) => {
    const gradientId = `gradient-${baseColor}`;

    return (
        <Chart
            data={data}
            area={true}
            xAxis={{
                scaleType: "point",
                data: monthDays,
                valueFormatter: (value) => value,
            }}
            height={60}
            showTooltip
            showHighlight
            sx={{
                width: "100%",
                ".MuiAreaElement-root": {
                    fill: `url(#${gradientId})`,
                },
                ".MuiLineElement-root": {
                    stroke: baseColor,
                    strokeWidth: 2,
                },
            }}
            slotProps={{
                line: {
                    color: baseColor,
                },
            }}
        >
            <ColorSwitch colorId={gradientId} color={baseColor} />
        </Chart>
    );
};

export default SparkLineChart;
