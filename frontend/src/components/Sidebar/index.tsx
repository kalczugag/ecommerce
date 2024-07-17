import { useState } from "react";
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

const minDistance = 10;

interface SidebarProps {
    data: {
        colorsCount: {
            color: string;
            count: number;
        }[];
        availableSizes: string[];
        maxPrice: number;
    };
    onSubmit: (values: any) => void;
}

const Sidebar = ({ data, onSubmit }: SidebarProps) => {
    const [priceRange, setpriceRange] = useState<number[]>([
        0,
        data?.maxPrice || 9999,
    ]);
    const [discountRange, setDiscountRange] = useState<number[]>([0, 100]);

    const handleChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
        setValueFunction: React.Dispatch<React.SetStateAction<number[]>>
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        setValueFunction((prevValue) => {
            if (activeThumb === 0) {
                return [
                    Math.min(newValue[0], prevValue[1] - minDistance),
                    prevValue[1],
                ];
            } else {
                return [
                    prevValue[0],
                    Math.max(newValue[1], prevValue[0] + minDistance),
                ];
            }
        });
    };

    return (
        <Form
            onSubmit={(e) => {
                onSubmit({ ...e, priceRange, discountRange });
            }}
            subscription={{}}
            render={({ handleSubmit }) => (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-6 mr-8 z-10 min-w-48"
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
                                        />
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            name={input.name}
                                            value={input.value}
                                            onChange={() => input.onChange}
                                            label="No"
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
    );
};

export default Sidebar;
