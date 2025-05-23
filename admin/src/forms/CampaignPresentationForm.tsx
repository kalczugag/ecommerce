import { Field } from "react-final-form";
import { compose, required } from "@/utils/validators";
import { TextField } from "@mui/material";
import Row from "@/components/Row";
import Editor from "@/components/Editor";

const CampaignPresentationForm = () => {
    return (
        <>
            <Row label="Campaign Name">
                <Field name="name" validate={required}>
                    {(props) => (
                        <TextField
                            label="Name"
                            name={props.input.name}
                            value={props.input.value || ""}
                            onChange={props.input.onChange}
                            onBlur={props.input.onBlur}
                            onFocus={props.input.onFocus}
                            error={props.meta.error && props.meta.touched}
                            helperText={
                                props.meta.error && props.meta.touched
                                    ? props.meta.error
                                    : null
                            }
                            fullWidth
                        />
                    )}
                </Field>
            </Row>
            <Row label="Description">
                <Field name="description">
                    {(props) => <Editor {...props.input} />}
                </Field>
            </Row>
        </>
    );
};

export default CampaignPresentationForm;
