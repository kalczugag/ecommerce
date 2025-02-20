import { Form, Field, FormSpy } from "react-final-form";
import DetailCard from "@/components/DetailCard";
import {
    Button,
    FormHelperText,
    InputAdornment,
    TextField,
} from "@mui/material";
import { compose, minValue, mustBeNumber, required } from "@/utils/validators";
import AlertDialog from "@/components/AlertDialog";
import type { ManageAction } from "@/modules/ManageModule/types/Manage";
import type { Order } from "@/types/Order";
import Row from "@/components/Row";

interface AddOtherItemProps extends ManageAction {
    data: Order;
}

const AddOtherItem = ({ data, handleSubTabChange }: AddOtherItemProps) => {
    const handleSubmit = (values: {
        name: string;
        quantity: number;
        unitPrice: number;
    }) => {
        console.log("Adding item:", values);
    };

    return (
        <DetailCard label="Add Other Item">
            <Form
                initialValues={{ unitPrice: 0 }}
                onSubmit={handleSubmit}
                render={({ handleSubmit, form }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-4">
                            <Field name="name" validate={required}>
                                {(props) => (
                                    <TextField
                                        {...props.input}
                                        label="Item Name"
                                        error={
                                            props.meta.error &&
                                            props.meta.touched
                                        }
                                        helperText={
                                            props.meta.error &&
                                            props.meta.touched
                                                ? props.meta.error
                                                : null
                                        }
                                        fullWidth
                                    />
                                )}
                            </Field>
                            <Row>
                                <Field
                                    name="quantity"
                                    validate={compose(
                                        required,
                                        mustBeNumber,
                                        minValue(0)
                                    )}
                                >
                                    {(props) => (
                                        <TextField
                                            {...props.input}
                                            onChange={(e) =>
                                                props.input.onChange(
                                                    e.target.value === ""
                                                        ? ""
                                                        : parseInt(
                                                              e.target.value
                                                          )
                                                )
                                            }
                                            type="number"
                                            label="Quantity"
                                            error={
                                                props.meta.error &&
                                                props.meta.touched
                                            }
                                            helperText={
                                                props.meta.error &&
                                                props.meta.touched
                                                    ? props.meta.error
                                                    : null
                                            }
                                            fullWidth
                                        />
                                    )}
                                </Field>
                                <Field
                                    name="unitPrice"
                                    validate={compose(
                                        required,
                                        mustBeNumber,
                                        minValue(0)
                                    )}
                                >
                                    {(props) => (
                                        <TextField
                                            {...props.input}
                                            value={props.input.value.toFixed(2)}
                                            type="number"
                                            label="Unit Price"
                                            slotProps={{
                                                htmlInput: {
                                                    step: 0.05,
                                                    min: 0,
                                                },
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            $
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            onChange={(e) =>
                                                props.input.onChange(
                                                    parseFloat(
                                                        e.target.value === ""
                                                            ? "0"
                                                            : e.target.value
                                                    )
                                                )
                                            }
                                            error={
                                                props.meta.error &&
                                                props.meta.touched
                                            }
                                            helperText={
                                                props.meta.error &&
                                                props.meta.touched
                                                    ? props.meta.error
                                                    : null
                                            }
                                            fullWidth
                                        />
                                    )}
                                </Field>
                            </Row>
                            <FormSpy>
                                {({ form }) => (
                                    <FormHelperText>
                                        Total: $
                                        {form.getState().values.unitPrice &&
                                        form.getState().values.quantity
                                            ? (
                                                  form.getState().values
                                                      .unitPrice *
                                                  form.getState().values
                                                      .quantity
                                              ).toFixed(2)
                                            : 0}
                                    </FormHelperText>
                                )}
                            </FormSpy>
                            <div className="flex space-x-2">
                                <Button
                                    variant="outlined"
                                    onClick={() => handleSubTabChange(0)}
                                >
                                    Cancel
                                </Button>
                                <AlertDialog
                                    title="Confirm Item Addition"
                                    content="Are you sure you want to add this item?"
                                    cancel="No"
                                    confirm="Yes"
                                    onConfirm={form.submit}
                                >
                                    {(props) => (
                                        <Button
                                            variant="contained"
                                            onClick={props.open}
                                        >
                                            Add Item
                                        </Button>
                                    )}
                                </AlertDialog>
                            </div>
                        </div>
                    </form>
                )}
            />
        </DetailCard>
    );
};

export default AddOtherItem;
