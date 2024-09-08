import { Field } from "react-final-form";
import { TextField } from "@mui/material";
import Row from "@/components/Row";

interface CustomerFormProps {
    isLoading: boolean;
}

const CustomerForm = ({ isLoading }: CustomerFormProps) => {
    return (
        <div className="space-y-4">
            <Row>
                <Field name="firstName">
                    {(props) => (
                        <TextField
                            label="First Name"
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
                            fullWidth
                        />
                    )}
                </Field>
                <Field name="lastName">
                    {(props) => (
                        <TextField
                            label="Last Name"
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
                            fullWidth
                        />
                    )}
                </Field>
            </Row>
            {/* <Field name="role"></Field>
            <Field name="birthday"></Field> */}
            <Row label="Address">
                <Field name="address.street">
                    {(props) => (
                        <TextField
                            label="Street"
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
                            fullWidth
                        />
                    )}
                </Field>
            </Row>
            <Row>
                <Field name="address.city">
                    {(props) => (
                        <TextField
                            label="City"
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
                            fullWidth
                        />
                    )}
                </Field>
                <Field name="address.state">
                    {(props) => (
                        <TextField
                            label="State"
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
                            fullWidth
                        />
                    )}
                </Field>
                <Field name="address.postalCode">
                    {(props) => (
                        <TextField
                            label="Postal Code"
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
                            fullWidth
                        />
                    )}
                </Field>
            </Row>
            <Field name="address.country">
                {(props) => (
                    <TextField
                        label="Country"
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
                        fullWidth
                    />
                )}
            </Field>
            <Row label="Contact">
                <Field name="phone">
                    {(props) => (
                        <TextField
                            label="Phone"
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
                            fullWidth
                        />
                    )}
                </Field>
                <Field name="email">
                    {(props) => (
                        <TextField
                            label="Email"
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
                            fullWidth
                        />
                    )}
                </Field>
            </Row>
        </div>
    );
};

export default CustomerForm;
