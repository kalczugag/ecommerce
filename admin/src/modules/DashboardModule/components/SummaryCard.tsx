import { ReactNode } from "react";
import dayjs from "dayjs";
import { Chip } from "@mui/material";
import { BarChart, LineChart, SparkLineChart } from "@/components/StyledCharts";
import {
    generateMonthDays,
    generateRandomData,
} from "@/utils/generateMonthDays";

export interface SummaryCardProps {
    label: ReactNode;
    subLabel?: ReactNode;
    value?: string;
    rate?: number;
    data?: any[];
    size?: "small" | "medium" | "large";
    type?: "sparkLine" | "line" | "bar";
    children?: ReactNode;
}

const colors = {
    primary: "#0D5DAE",
    secondary: "#027AF2",
    tetriary: "#99CCFF",
};

const SummaryCard = ({
    label,
    subLabel,
    value,
    rate: rateNumber,
    data,
    type = "sparkLine",
    size = "small",
    children,
}: SummaryCardProps) => {
    const rate = rateNumber || 0;

    const rateSign = rate > 0 ? "+" : "";
    const rateColorKey = rate > 5 ? "success" : rate < 5 ? "error" : "default";
    const baseColor = rate > 5 ? "#52BC52" : rate < 5 ? "#C20A0A" : "#929EB6";
    const rateLabel = `${rateSign}${rate}%`;

    const monthDays = generateMonthDays(dayjs().year(), dayjs().month() + 1);
    const randomData = generateRandomData(monthDays.length);

    const selectedChart =
        type === "sparkLine" ? (
            <SparkLineChart
                data={randomData}
                monthDays={monthDays}
                baseColor={baseColor}
            />
        ) : type === "line" ? (
            <LineChart
                data={randomData}
                monthDays={monthDays}
                colors={colors}
            />
        ) : (
            <BarChart colors={colors} />
        );

    return (
        <div
            className={`flex-1 flex flex-col min-w-60 space-y-1 p-4 border rounded-lg bg-[#F5F6FA] dark:bg-[#0C1017] ${
                size !== "large" && "max-h-48"
            }`}
        >
            <h5 className="text-sm">{label}</h5>
            {value && rate && (
                <div
                    className={`flex items-center ${
                        size === "small" && "justify-between"
                    } ${
                        (size === "large" || size === "medium") && "space-x-2"
                    } `}
                >
                    <p className="text-2xl font-semibold">{value}</p>
                    <Chip
                        label={rateLabel}
                        size="small"
                        variant="outlined"
                        color={rateColorKey}
                        sx={{ fontWeight: "bold", fontSize: "12px" }}
                    />
                </div>
            )}
            {subLabel && (
                <p className="text-[12px] text-gray-600">{subLabel}</p>
            )}
            {data && selectedChart}
            {children}
        </div>
    );
};

export default SummaryCard;
