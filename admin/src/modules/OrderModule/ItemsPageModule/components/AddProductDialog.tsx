import { useState } from "react";
import { useParams } from "react-router-dom";
import { Field, Form, FormSpy } from "react-final-form";
import { compose, maxValue, minValue, required } from "@/utils/validators";
import { useAddBaseItemMutation } from "@/store";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    ListSubheader,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { Add, RestartAlt } from "@mui/icons-material";
import type { Product } from "@/types/Product";
import type { Shipment } from "@/types/Order";

interface AddProductDialogProps {
    data: Product;
    shipments: Shipment[];
}

interface FormValues {
    unitPrice: number;
    quantity: number;
    shipmentId: string;
}

const AddProductDialog = ({ data, shipments }: AddProductDialogProps) => {
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const { handleMutation } = useHandleMutation();

    const [addBaseItem, { isLoading: addBaseItemLoading }] =
        useAddBaseItemMutation();

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleSubmit = (values: FormValues) => {
        handleMutation({
            values: {
                orderId: id,
                _product: data._id,
                ...values,
            },
            mutation: addBaseItem,
        });
        handleClose();
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <Add />
            </IconButton>
            <Dialog open={isOpen} onClose={handleClose}>
                <Form
                    initialValues={{
                        unitPrice: data.price,
                        quantity: 1,
                    }}
                    onSubmit={handleSubmit}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <DialogTitle>Add Product</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Add a product to this order. You can pick an
                                    existing shipment, create a new shipment, or
                                    make the item non-shippable.
                                </DialogContentText>
                            </DialogContent>
                            <DialogContent>
                                <div>
                                    <span className="font-semibold">
                                        Product:{" "}
                                    </span>
                                    <span>{data.title}</span>
                                </div>
                                <div>
                                    <span className="font-semibold">SKU: </span>
                                    <span>{data.sku}</span>
                                </div>
                            </DialogContent>
                            <DialogContent className="flex flex-row justify-between">
                                <div className="flex-1 flex flex-col space-y-4">
                                    <Field
                                        name="unitPrice"
                                        validate={compose(
                                            required,
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
                                                label="Price"
                                                slotProps={{
                                                    htmlInput: {
                                                        step: 0.05,
                                                    },
                                                    input: {
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                $
                                                            </InputAdornment>
                                                        ),
                                                        endAdornment: (
                                                            <FormSpy
                                                                subscription={{
                                                                    initialValues:
                                                                        true,
                                                                }}
                                                            >
                                                                {({
                                                                    form,
                                                                    initialValues,
                                                                }) =>
                                                                    props.input
                                                                        .value !==
                                                                        initialValues.unitPrice && (
                                                                        <IconButton
                                                                            onClick={() =>
                                                                                form.change(
                                                                                    "unitPrice",
                                                                                    initialValues.unitPrice
                                                                                )
                                                                            }
                                                                        >
                                                                            <RestartAlt />
                                                                        </IconButton>
                                                                    )
                                                                }
                                                            </FormSpy>
                                                        ),
                                                    },
                                                }}
                                                onChange={(e) =>
                                                    props.input.onChange(
                                                        parseFloat(
                                                            e.target.value
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
                                            />
                                        )}
                                    </Field>
                                    <Field
                                        name="quantity"
                                        validate={compose(
                                            required,
                                            minValue(1),
                                            maxValue(data.quantity || 1)
                                        )}
                                    >
                                        {(props) => (
                                            <TextField
                                                {...props.input}
                                                type="number"
                                                label="Quantity"
                                                slotProps={{
                                                    htmlInput: {
                                                        max: data.quantity,
                                                        min: 1,
                                                    },
                                                }}
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
                                            />
                                        )}
                                    </Field>
                                </div>

                                <Divider
                                    orientation="vertical"
                                    sx={{ marginX: 4 }}
                                    flexItem
                                />

                                <div className="flex-1 flex flex-col space-y-4">
                                    <Field
                                        name="shipmentId"
                                        type="select"
                                        validate={required}
                                    >
                                        {(props) => (
                                            <FormControl fullWidth>
                                                <InputLabel
                                                    error={
                                                        props.meta.error &&
                                                        props.meta.touched
                                                    }
                                                >
                                                    Shipment
                                                </InputLabel>
                                                <Select
                                                    {...props.input}
                                                    label="Shipment"
                                                    MenuProps={{
                                                        slotProps: {
                                                            paper: {
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                            },
                                                        },
                                                    }}
                                                    error={
                                                        props.meta.error &&
                                                        props.meta.touched
                                                    }
                                                >
                                                    <MenuItem value="">
                                                        None
                                                    </MenuItem>
                                                    <Divider />
                                                    <ListSubheader>
                                                        Existing Shipments
                                                    </ListSubheader>
                                                    {shipments.map(
                                                        (shipment, index) => (
                                                            <MenuItem
                                                                key={
                                                                    shipment._id
                                                                }
                                                                value={
                                                                    shipment._id
                                                                }
                                                            >
                                                                #{index + 1}{" "}
                                                                {
                                                                    shipment
                                                                        ._deliveryMethod
                                                                        .providers[0]
                                                                        .name
                                                                }
                                                            </MenuItem>
                                                        )
                                                    )}
                                                    <Divider />
                                                    <MenuItem value="new">
                                                        ** New Shipment
                                                    </MenuItem>
                                                </Select>
                                                {props.meta.error &&
                                                    props.meta.touched && (
                                                        <FormHelperText error>
                                                            Select shipment
                                                        </FormHelperText>
                                                    )}
                                            </FormControl>
                                        )}
                                    </Field>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="info">
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="info"
                                    disabled={addBaseItemLoading}
                                >
                                    Add Product
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                />
            </Dialog>
        </>
    );
};

export default AddProductDialog;
