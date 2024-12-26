import { useState } from "react";
import { Field } from "react-final-form";
import { required } from "@/utils/validators";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import Row from "@/components/Row";

interface DeliveryFormProps {
    isLoading: boolean;
}

interface LabeledFormProps {
    name: string;
    isLoading: boolean;
}

const LabeledForm = ({ name, isLoading }: LabeledFormProps) => {
    return (
        <div className="space-y-4 w-full">
            <Row>
                <Field name="firstName" validate={required}>
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
                            disabled
                            fullWidth
                        />
                    )}
                </Field>
                <Field name="lastName" validate={required}>
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
                            disabled
                            fullWidth
                        />
                    )}
                </Field>
            </Row>
            <Row>
                <Field name={`${name}.street`} validate={required}>
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
                <Field name={`${name}.city`} validate={required}>
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
                <Field name={`${name}.state`} validate={required}>
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
            </Row>
            <Row>
                <Field name={`${name}.postalCode`} validate={required}>
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
                <Field name={`${name}.country`} validate={required}>
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
            </Row>
        </div>
    );
};

const DeliveryForm = ({ isLoading }: DeliveryFormProps) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="space-y-4">
            <LabeledForm name="shippingAddress" isLoading={isLoading} />
            <Field name="sameAsShipping" type="checkbox">
                {({ input }) => (
                    <FormControlLabel
                        {...input}
                        control={<Checkbox />}
                        label="Same as shipping address"
                        disabled={isLoading}
                        onChange={(e: any) => {
                            setShowForm(!showForm);
                            input.onChange(e);
                        }}
                    />
                )}
            </Field>
            {showForm && (
                <LabeledForm name="billingAddress" isLoading={isLoading} />
            )}
        </div>
    );
};

export default DeliveryForm;
