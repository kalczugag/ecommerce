import { Field } from "react-final-form";
import { ExpandMore } from "@mui/icons-material";
import {
    Accordion as MuiAccordion,
    AccordionDetails,
    AccordionSummary,
    AccordionProps,
    Checkbox,
    Divider,
    FormControlLabel,
    Slider,
    styled,
} from "@mui/material";
import type { ProductFilters } from "@/types/Product";

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

const valuetext = (value: number) => `${value}USD`;

interface SidebarSortFormProps {
    config: {
        data: ProductFilters;
        disabled?: boolean;
    };
}

const SidebarSortForm = ({ config }: SidebarSortFormProps) => {
    const { data, disabled } = config;

    return (
        <>
            <Field name="color" type="checkbox">
                {({ input }) => (
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            Color
                        </AccordionSummary>
                        <AccordionDetails>
                            {data?.colorsCount.map((color, index) => (
                                <FormControlLabel
                                    key={color.color + "_" + index.toString()}
                                    control={<Checkbox />}
                                    name={input.name}
                                    value={input.value}
                                    onChange={() => input.onChange(color.color)}
                                    label={`${color.color} (${color.count})`}
                                    disabled={disabled}
                                />
                            ))}
                        </AccordionDetails>
                    </Accordion>
                )}
            </Field>
            <Divider />
            <Field name="size">
                {({ input }) => (
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            Size
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {data?.availableSizes.map((size, index) => (
                                <FormControlLabel
                                    key={size + "_" + index.toString()}
                                    control={<Checkbox />}
                                    name={input.name}
                                    value={input.value}
                                    onChange={() => input.onChange(size)}
                                    label={size}
                                    disabled={disabled}
                                />
                            ))}
                        </AccordionDetails>
                    </Accordion>
                )}
            </Field>
            <Divider />
            <Field
                name="priceRange"
                parse={(value) => value || [0, data?.maxPrice]}
            >
                {({ input }) => (
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            Price
                        </AccordionSummary>
                        <AccordionDetails>
                            <Slider
                                name={input.name}
                                value={input.value || [0, data?.maxPrice]}
                                onChange={(_, value) => {
                                    input.onChange(value);
                                }}
                                max={data?.maxPrice}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disabled={disabled}
                                disableSwap
                            />
                        </AccordionDetails>
                    </Accordion>
                )}
            </Field>
            <Divider />
            <Field name="discountRange" parse={(value) => value || [0, 100]}>
                {({ input }) => (
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            Discount Range
                        </AccordionSummary>
                        <AccordionDetails>
                            <Slider
                                name={input.name}
                                getAriaLabel={() => "Minimum distance"}
                                value={input.value || [0, 100]}
                                onChange={(_, value) => {
                                    input.onChange(value);
                                }}
                                max={100}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disabled={disabled}
                                disableSwap
                            />
                        </AccordionDetails>
                    </Accordion>
                )}
            </Field>
            <Divider />
            <Field name="availability" type="checkbox">
                {({ input }) => (
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            Availability
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <FormControlLabel
                                control={<Checkbox />}
                                name={input.name}
                                value={input.value}
                                onChange={input.onChange}
                                label="Yes"
                                disabled
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                name={input.name}
                                value={input.value}
                                onChange={() => input.onChange}
                                label="No"
                                disabled
                            />
                        </AccordionDetails>
                    </Accordion>
                )}
            </Field>
        </>
    );
};

export default SidebarSortForm;
