import { useMemo, useState } from "react";
import {
    Stack,
    Box,
    Grid2 as Grid,
    Typography,
    Divider,
    Collapse,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const IGNORED_KEYS = new Set(["__v", "_id", "createdAt", "updatedAt"]);

const Review = ({ values }: { values: Record<string, unknown> }) => {
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
    const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

    const entries = useMemo(
        () => Object.entries(values).filter(([key]) => !IGNORED_KEYS.has(key)),
        [values]
    );

    const toggle = (id: string) =>
        setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));

    const renderPrimitive = (val: unknown) => {
        const str = String(val ?? "");
        return (
            <Typography
                variant="body2"
                color="textSecondary"
                sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
                {str.length > 120 ? `${str.slice(0, 120)}…` : str}
            </Typography>
        );
    };

    const renderField = (
        key: string,
        value: unknown,
        indent: number = 0
    ): React.ReactNode => {
        const isObject = value !== null && typeof value === "object";
        const id = `${key}-${indent}`;
        const expanded = !!openMap[id];

        const label = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (s) => s.toUpperCase());

        return (
            <Box key={id} sx={{ pl: indent, width: "100%" }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ mb: 1 }}
                >
                    {isObject && (
                        <IconButton
                            size="small"
                            onClick={() => toggle(id)}
                            sx={{
                                transform: expanded
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                transition: "transform 200ms",
                                p: 0.5,
                            }}
                        >
                            <ExpandMore fontSize="small" />
                        </IconButton>
                    )}
                    <Typography
                        variant={indent === 0 ? "subtitle2" : "body2"}
                        color={
                            isObject && indent === 0
                                ? "text.secondary"
                                : undefined
                        }
                        fontWeight={
                            !isObject && indent > 0 ? "bold" : undefined
                        }
                        sx={{
                            textTransform:
                                indent === 0 ? "capitalize" : undefined,
                            wordBreak: "break-word",
                        }}
                    >
                        {label}
                    </Typography>
                </Stack>

                {isObject ? (
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Box mt={1}>
                            {Array.isArray(value)
                                ? (value as unknown[]).map((item, idx) => (
                                      <Box key={idx} sx={{ mb: 1 }}>
                                          {renderField(
                                              String(idx),
                                              item,
                                              indent + 2
                                          )}
                                      </Box>
                                  ))
                                : Object.entries(
                                      value as Record<string, unknown>
                                  ).map(([k, v]) => (
                                      <Box key={k} sx={{ mb: 1 }}>
                                          {renderField(k, v, indent + 2)}
                                      </Box>
                                  ))}
                        </Box>
                    </Collapse>
                ) : (
                    renderPrimitive(value)
                )}
            </Box>
        );
    };

    if (entries.length === 0) {
        return (
            <Typography color="textSecondary" textAlign="center" py={4}>
                No data available to review.
            </Typography>
        );
    }

    return (
        <Grid container spacing={2} columns={isMdUp ? 12 : 1}>
            {entries.map(([key, value]) => (
                <Grid size={{ xs: 12, md: 6 }} key={key}>
                    {renderField(key, value)}
                    <Divider sx={{ my: 1 }} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Review;
