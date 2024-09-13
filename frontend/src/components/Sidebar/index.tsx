import { Form, Field, FormSpy } from "react-final-form";
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
    Button,
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

const valuetext = (value: number) => `${value}PLN`;

interface SidebarProps {
    data: {
        colorsCount: {
            color: string;
            count: number;
        }[];
        availableSizes: string[];
        maxPrice: number;
    };
    disabled?: boolean;
    onSubmit: (values: any) => void;
}

const Sidebar = ({ data, disabled, onSubmit }: SidebarProps) => {
    return (
        <div className="hidden md:block">
            <Form
                onSubmit={onSubmit}
                subscription={{}}
                render={({ handleSubmit }) => (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-6 mr-8 z-10 min-w-48 max-w-48"
                    >
                        <h3 className="text-lg text-gray-500 font-semibold">
                            Filters
                        </h3>
                        <div className="border-gray-500">
                            <Field name="color" type="checkbox">
                                {({ input }) => (
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                        >
                                            Color
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {data?.colorsCount.map(
                                                (color, index) => (
                                                    <FormControlLabel
                                                        key={
                                                            color.color +
                                                            "_" +
                                                            index.toString()
                                                        }
                                                        control={<Checkbox />}
                                                        name={input.name}
                                                        value={input.value}
                                                        onChange={() =>
                                                            input.onChange(
                                                                color.color
                                                            )
                                                        }
                                                        label={`${color.color} (${color.count})`}
                                                        disabled={disabled}
                                                    />
                                                )
                                            )}
                                        </AccordionDetails>
                                    </Accordion>
                                )}
                            </Field>
                            <Divider />
                            <Field name="size">
                                {({ input }) => (
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                        >
                                            Size
                                        </AccordionSummary>
                                        <AccordionDetails
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            {data?.availableSizes.map(
                                                (size, index) => (
                                                    <FormControlLabel
                                                        key={
                                                            size +
                                                            "_" +
                                                            index.toString()
                                                        }
                                                        control={<Checkbox />}
                                                        name={input.name}
                                                        value={input.value}
                                                        onChange={() =>
                                                            input.onChange(size)
                                                        }
                                                        label={size}
                                                        disabled={disabled}
                                                    />
                                                )
                                            )}
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
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                        >
                                            Price
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Slider
                                                name={input.name}
                                                value={
                                                    input.value || [
                                                        0,
                                                        data?.maxPrice,
                                                    ]
                                                }
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
                            <Field
                                name="discountRange"
                                parse={(value) => value || [0, 100]}
                            >
                                {({ input }) => (
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                        >
                                            Discount Range
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Slider
                                                name={input.name}
                                                getAriaLabel={() =>
                                                    "Minimum distance"
                                                }
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
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                        >
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
                        </div>
                        <FormSpy subscription={{ dirty: true }}>
                            {({ dirty }) => (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty}
                                >
                                    Apply
                                </Button>
                            )}
                        </FormSpy>
                    </form>
                )}
            />
        </div>
    );
};

export default Sidebar;
