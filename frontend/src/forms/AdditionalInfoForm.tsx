import { TextField } from "@mui/material";
import { Field } from "react-final-form";

interface AdditionalInfoFormProps {
    isLoading: boolean;
}

const AdditionalInfoForm = ({ isLoading }: AdditionalInfoFormProps) => {
    return (
        <>
            <Field name="additionalInfo">
                {(props) => (
                    <TextField
                        label="Additional Info"
                        name={props.input.name}
                        value={props.input.value}
                        onChange={props.input.onChange}
                        error={props.meta.error && props.meta.touched}
                        helperText={
                            props.meta.error && props.meta.touched
                                ? props.meta.error
                                : null
                        }
                        disabled={isLoading}
                        multiline
                        rows={4}
                        fullWidth
                    />
                )}
            </Field>
        </>
    );
};

export default AdditionalInfoForm;
