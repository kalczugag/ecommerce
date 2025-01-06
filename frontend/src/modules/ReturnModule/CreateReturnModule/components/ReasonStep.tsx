import { useState } from "react";
import { Field } from "react-final-form";
import { returnReasons } from "@/constants/returns";
import { required } from "@/utils/validators";
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import type { StepProps } from "../../../../types/Step";

const ReasonStep = ({ formValues }: StepProps) => {
    const [isOther, setIsOther] = useState(false);

    return (
        <FormControl component="fieldset" disabled={Boolean(formValues.reason)}>
            <Field name="reason" type="radio" validate={required}>
                {({ input, meta }) => (
                    <>
                        <RadioGroup
                            aria-labelledby="radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange={(e) => {
                                input.onChange(e.target.value);
                                setIsOther(e.target.value === "other");
                            }}
                            defaultValue={formValues?.reason}
                            value={input.value}
                        >
                            {returnReasons.map((reason, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={reason}
                                    control={<Radio />}
                                    label={reason}
                                />
                            ))}
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

            {isOther && (
                <Field name="otherReason" validate={required}>
                    {({ input, meta }) => (
                        <>
                            <TextField
                                {...input}
                                label="Please specify the reason"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={3}
                            />
                            {meta.error && meta.touched && (
                                <FormHelperText error={true}>
                                    Please specify your reason for return
                                </FormHelperText>
                            )}
                        </>
                    )}
                </Field>
            )}
        </FormControl>
    );
};

export default ReasonStep;
