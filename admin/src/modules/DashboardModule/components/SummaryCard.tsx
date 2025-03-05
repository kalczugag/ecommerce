import { ReactNode } from "react";
import dayjs from "dayjs";
import { Chip, useTheme } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
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
    children?: ReactNode;
}

const ColorSwitch = ({
    colorId,
    color,
}: {
    colorId: string;
    color: string;
}) => {
    const { top, height, bottom } = useDrawingArea();
    const svgHeight = top + bottom + height;

    return (
        <defs>
            <linearGradient
                id={colorId}
                x1="0"
                y1="0"
                x2="0"
                y2={`${svgHeight}px`}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor={color} stopOpacity="0.3" />
                <stop offset="1" stopColor={color} stopOpacity="0" />
            </linearGradient>
        </defs>
    );
};

const SummaryCard = ({
    label,
    subLabel,
    value,
    rate: rateNumber,
    data,
    children,
}: SummaryCardProps) => {
    const rate = rateNumber || 0;

    const rateSign = rate > 0 ? "+" : "";
    const rateColorKey = rate > 5 ? "success" : rate < 5 ? "error" : "default";
    const baseColor = rate > 5 ? "#52BC52" : rate < 5 ? "#C20A0A" : "#929EB6";
    const rateLabel = `${rateSign}${rate}%`;
    const gradientId = `gradient-${baseColor}`;

    const monthDays = generateMonthDays(dayjs().year(), dayjs().month() + 1);
    const randomData = generateRandomData(monthDays.length);

    return (
        <div className=" flex-1 flex flex-col min-w-60 space-y-1 p-4 border rounded-lg bg-[#F5F6FA] dark:bg-[#0C1017]">
            <h5 className="text-sm">{label}</h5>
            {value && rate && (
                <div className="flex items-center justify-between">
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
            {data && (
                <SparkLineChart
                    data={randomData}
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
                </SparkLineChart>
            )}
            {children}
        </div>
    );
};

export default SummaryCard;
