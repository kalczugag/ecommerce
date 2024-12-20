import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import { Form, Field } from "react-final-form";

const content = [
    { label: "Home Delivery", value: "homeDelivery" },
    {
        label: "Pickup point",
        value: "pickupPoint",
    },
    {
        label: "In store pickup",
        value: "inStorePickup",
    },
];

const GeneralSettingsModule = () => {
    const handleSubmit = (value: string) => {
        console.log(value);
    };

    return (
        <Form
            onSubmit={handleSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel>Delivery method</FormLabel>
                        <Field name="deliveryMethod" type="radio">
                            {({ input }) => (
                                <RadioGroup
                                    value={input.value}
                                    onChange={input.onChange}
                                >
                                    {content.map((item) => (
                                        <div className="flex flex-row items-center justify-between">
                                            <FormControlLabel
                                                key={item.label}
                                                value={item.value}
                                                control={<Radio />}
                                                label={item.label}
                                            />
                                            <span>$5</span>
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}
                        </Field>
                    </FormControl>
                </form>
            )}
        />
    );
};

export default GeneralSettingsModule;
