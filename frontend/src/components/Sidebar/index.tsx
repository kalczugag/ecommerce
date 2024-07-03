import { useState } from "react";
import {
    styled,
    Accordion as MuiAccordion,
    AccordionProps,
    AccordionSummary,
    AccordionDetails,
    Divider,
    Checkbox,
    Slider,
    FormControlLabel,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&::before": {
        display: "none",
    },
}));

export interface SidebarProps {
    data?: {
        colorsCount: {
            color: string;
            count: number;
        }[];
        availableSizes: string[];
        maxPrice: number;
    };
}

function valuetext(value: number) {
    return `${value}PLN`;
}

const minDistance = 10;

const Sidebar = ({ data }: SidebarProps) => {
    const [value, setValue] = useState<number[]>([0, 1]);

    const handleChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };

    return (
        <div className="flex flex-col space-y-6 mr-8 z-10 min-w-48">
            <h3 className="text-lg text-gray-500 font-semibold">Filters</h3>
            <div className="border-gray-500">
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        Color
                    </AccordionSummary>
                    <AccordionDetails>
                        {data?.colorsCount.map((color) => (
                            <FormControlLabel
                                control={<Checkbox />}
                                label={`${color.color} (${color.count})`}
                            />
                        ))}
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        Size
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{ display: "flex", flexDirection: "column" }}
                    >
                        {data?.availableSizes.map((size) => (
                            <FormControlLabel
                                control={<Checkbox />}
                                label={size}
                            />
                        ))}
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        Price
                    </AccordionSummary>
                    <AccordionDetails>
                        <Slider
                            getAriaLabel={() => "Minimum distance"}
                            value={value}
                            onChange={handleChange}
                            max={data?.maxPrice}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            disableSwap
                        />
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        Discount Range
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                </Accordion>
                <Divider />
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        Availability
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
};

export default Sidebar;
