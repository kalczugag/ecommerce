import { PieChart } from "@mui/x-charts";
import { Box, Typography } from "@mui/material";
import { SummaryByCountry } from "@/types/Analytics";

interface DonutChartProps {
    total: number;
    byCountry: SummaryByCountry[];
}

const colors = [
    "#94A0B8",
    "#566480",
    "#47536B",
    "#3A4457",
    "#2D3647",
    "#1F2735",
];

const DonutChart = ({ total, byCountry }: DonutChartProps) => {
    const sortedData = [...byCountry].sort((a, b) => b.count - a.count);
    const top3 = sortedData.slice(0, 3);
    const otherCount = sortedData
        .slice(3)
        .reduce((sum, item) => sum + item.count, 0);

    const finalData = otherCount
        ? [
              ...top3,
              {
                  country: "Other",
                  count: otherCount,
                  flag: "https://ipdata.co/flags/globe.png",
              },
          ]
        : top3;

    const formattedData = finalData.map((item, index) => ({
        id: index,
        label: item.country,
        value: item.count,
        color: colors[index] || colors[colors.length - 1],
        flag: item.flag,
    }));

    return (
        <Box
            sx={{
                position: "relative",
                textAlign: "center",
                maxWidth: 350,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <PieChart
                    series={[
                        {
                            data: formattedData,
                            highlightScope: {
                                fade: "global",
                                highlight: "item",
                            },
                            faded: {
                                innerRadius: 70,
                                outerRadius: 95,
                                paddingAngle: 2,
                            },
                            innerRadius: 70,
                            outerRadius: 100,
                            paddingAngle: 2,
                        },
                    ]}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    height={260}
                    width={220}
                    legend={{ hidden: true }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h6" fontWeight="bold">
                        {total}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Total
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
                {formattedData.map((item, idx) => {
                    const percentage = Math.round((item.value / total) * 100);

                    return (
                        <Box
                            key={item.id}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                mb: 2,
                            }}
                        >
                            {/* Country Flag */}
                            <Box
                                component="img"
                                src={item.flag}
                                alt={`${item.label} flag`}
                                sx={{
                                    width: 24,
                                    height: 24,
                                    mr: 1,
                                    borderRadius: "999999px",
                                }}
                            />

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    width: "100%",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        mb: 0.5,
                                    }}
                                >
                                    <Typography variant="body2">
                                        {item.label}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        fontWeight="bold"
                                    >
                                        {percentage}%
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: "100%",
                                        height: 8,
                                        backgroundColor: "#E0E0E0",
                                        borderRadius: 4,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: `${percentage}%`,
                                            height: "100%",
                                            backgroundColor: colors[idx],
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default DonutChart;
