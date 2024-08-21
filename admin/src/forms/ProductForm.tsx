import { ReactNode } from "react";
import { Field } from "react-final-form";
import { TextField } from "@mui/material";
import { required, mustBeNumber, minValue, compose } from "@/utils/validators";

interface CustomerFormProps {
    isLoading: boolean;
}

const Row = ({ children }: { children: ReactNode }) => {
    return <div className="flex space-x-2">{children}</div>;
};

const ProductForm = ({ isLoading }: CustomerFormProps) => {
    return (
        <div className="space-y-4">
            <Field name="imageUrl" validate={required}>
                {(props) => (
                    <TextField
                        label="Image URL"
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
            <Row>
                <Field name="brand" validate={required}>
                    {(props) => (
                        <TextField
                            label="Brand"
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
                <Field name="title" validate={required}>
                    {(props) => (
                        <TextField
                            label="Title"
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
                <Field name="color" validate={required}>
                    {(props) => (
                        <TextField
                            label="Color"
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
                <Field
                    name="quantity"
                    type="number"
                    validate={compose(required, mustBeNumber, minValue(0))}
                >
                    {(props) => (
                        <TextField
                            label="Quantity"
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
                <Field
                    name="price"
                    type="number"
                    validate={compose(required, mustBeNumber, minValue(0))}
                >
                    {(props) => (
                        <TextField
                            label="Price"
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
                <Field
                    name="discountedPrice"
                    type="number"
                    validate={compose(mustBeNumber, minValue(0))}
                >
                    {(props) => (
                        <TextField
                            label="Discounted Price"
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
                <Field
                    name="discountPercent"
                    type="number"
                    validate={compose(mustBeNumber, minValue(0))}
                >
                    {(props) => (
                        <TextField
                            label="Discount Percentage"
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
            <Field name="description" type="textarea">
                {(props) => (
                    <TextField
                        label="Description"
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
                        fullWidth
                    />
                )}
            </Field>
        </div>
    );
};

export default ProductForm;
