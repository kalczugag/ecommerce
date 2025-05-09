import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
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
        data?: ProductFilters;
        disabled?: boolean;
    };
}

const SidebarSortForm = ({ config }: SidebarSortFormProps) => {
    const { data, disabled } = config;

    return (
        <>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    Color
                </AccordionSummary>
                <AccordionDetails>
                    {data?.colors.map((color, index) => (
                        <Field
                            name="color"
                            type="checkbox"
                            key={color.color + "_" + index}
                            value={color.color}
                        >
                            {({ input }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            {...input}
                                            disabled={disabled}
                                        />
                                    }
                                    label={`${color.color} (${color.count})`}
                                />
                            )}
                        </Field>
                    ))}
                </AccordionDetails>
            </Accordion>

            <Divider />

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
                    {data?.sizes.map((sizesData) =>
                        sizesData.sizes.map((size, index) => (
                            <Field
                                name="size.name"
                                type="checkbox"
                                value={size.name}
                                key={size.name + "_" + index}
                            >
                                {({ input }) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                {...input}
                                                disabled={disabled}
                                            />
                                        }
                                        label={size.name}
                                    />
                                )}
                            </Field>
                        ))
                    )}
                </AccordionDetails>
            </Accordion>

            <Divider />

            <Field
                name="price"
                parse={(value) => value || [0, data?.priceRange.max]}
            >
                {({ input }) => (
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            Price
                        </AccordionSummary>
                        <AccordionDetails>
                            <Slider
                                name={input.name}
                                value={input.value || [0, data?.priceRange.max]}
                                onChange={(_, value) => {
                                    console.log(value);
                                    input.onChange(value);
                                }}
                                max={data?.priceRange.max}
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

            <Field name="discountPercent" parse={(value) => value || [0, 100]}>
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
