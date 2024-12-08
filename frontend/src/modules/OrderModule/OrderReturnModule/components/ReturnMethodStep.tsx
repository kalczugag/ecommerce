import { Field } from "react-final-form";
import { required } from "@/utils/validators";
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    Radio,
    RadioGroup,
} from "@mui/material";
import type { StepProps } from "../types/Step";

interface ItemBoxProps {}

// const ItemBox = ({}: ItemBoxProps) => {
//     return <div></div>;
// };

const ReturnMethodStep = ({ formValues }: StepProps) => {
    return (
        <FormControl component="fieldset" disabled={Boolean(formValues.reason)}>
            <Field name="reason" type="radio" validate={required}>
                {({ input, meta }) => (
                    <>
                        <RadioGroup
                            aria-labelledby="radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange={input.onChange}
                            defaultValue={formValues?.reason}
                            value={input.value}
                        >
                            {/* {returnReasons.map((reason, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={reason}
                                    control={<Radio />}
                                    label={reason}
                                />
                            ))} */}
                            <FormControlLabel
                                value="other"
                                control={<Radio />}
                                label="Other"
                            />
                        </RadioGroup>
                        {meta.error && meta.touched && (
                            <FormHelperText error={true}>
                                Please select a return reason
                            </FormHelperText>
                        )}
                    </>
                )}
            </Field>
        </FormControl>
    );
};

export default ReturnMethodStep;
