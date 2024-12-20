import { Field } from "react-final-form";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";

interface DeliveryMethodFormProps {
    content: {
        label: string;
        value: string;
    }[];
    isLoading: boolean;
}

const DeliveryMethodForm = ({
    content,
    isLoading,
}: DeliveryMethodFormProps) => {
    return (
        <FormControl disabled={isLoading}>
            <FormLabel>Delivery method</FormLabel>
            <Field name="deliveryMethod" type="radio">
                {({ input }) => (
                    <RadioGroup value={input.value} onChange={input.onChange}>
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
    );
};

export default DeliveryMethodForm;
