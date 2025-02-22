import { Form, Field, FormSpy } from "react-final-form";
import { useParams } from "react-router-dom";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import { useAddBaseItemMutation } from "@/store";
import { compose, minValue, mustBeNumber, required } from "@/utils/validators";
import {
    Button,
    Divider,
    InputAdornment,
    TextField,
    useMediaQuery,
} from "@mui/material";
import DetailCard from "@/components/DetailCard";
import AlertDialog from "@/components/AlertDialog";
import Row from "@/components/Row";
import type { ManageAction } from "@/modules/ManageModule/types/Manage";
import type { Order } from "@/types/Order";

interface AddOtherItemProps extends ManageAction {
    data: Order;
}

interface FormValues {
    name: string;
    quantity: number;
    unitPrice: number;
    color?: string;
    size?: string;
}

const AddOtherItem = ({ handleSubTabChange }: AddOtherItemProps) => {
    const { id } = useParams();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { handleMutation } = useHandleMutation();

    const [addProduct, { isLoading }] = useAddBaseItemMutation();

    const handleSubmit = (values: FormValues) => {
        handleMutation({
            values: { orderId: id || "", ...values },
            mutation: addProduct,
        });
        handleSubTabChange(0);
    };

    return (
        <DetailCard label="Add Other Item">
            <Form
                initialValues={{ unitPrice: 0 }}
                onSubmit={handleSubmit}
                render={({ handleSubmit, form }) => (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-between md:flex-row"
                    >
                        <div className="flex-1">
                            <p className="text-sm mb-4">
                                Add an item that is not linked to any existing
                                database product. This allows you to include
                                custom or miscellaneous items in the order by
                                specifying the values manually.
                            </p>
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
                                                value={props.input.value.toFixed(
                                                    2
                                                )}
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
                                                            e.target.value ===
                                                                ""
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
                                <Row>
                                    <Field name="color">
                                        {(props) => (
                                            <TextField
                                                {...props.input}
                                                label="Color"
                                                helperText="optional"
                                                fullWidth
                                            />
                                        )}
                                    </Field>
                                    <Field name="size">
                                        {(props) => (
                                            <TextField
                                                {...props.input}
                                                label="Size"
                                                helperText="optional"
                                                fullWidth
                                            />
                                        )}
                                    </Field>
                                </Row>
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
                                                disabled={isLoading}
                                            >
                                                Add Item
                                            </Button>
                                        )}
                                    </AlertDialog>
                                </div>
                            </div>
                        </div>

                        <Divider
                            orientation={isMobile ? "horizontal" : "vertical"}
                            flexItem
                            sx={isMobile ? { marginY: 4 } : { marginX: 4 }}
                        />

                        <div className="flex-1 flex items-end">
                            <FormSpy>
                                {({ form }) => (
                                    <div>
                                        <span className="font-semibold">
                                            Total:{" "}
                                        </span>
                                        <span>
                                            $
                                            {form.getState().values.unitPrice &&
                                            form.getState().values.quantity
                                                ? (
                                                      form.getState().values
                                                          .unitPrice *
                                                      form.getState().values
                                                          .quantity
                                                  ).toFixed(2)
                                                : "0.00"}
                                        </span>
                                    </div>
                                )}
                            </FormSpy>
                        </div>
                    </form>
                )}
            />
        </DetailCard>
    );
};

export default AddOtherItem;
