import { useState } from "react";
import { Field, Form } from "react-final-form";
import { compose, maxValue, minValue, required } from "@/utils/validators";
import { useGetDeliveryMethodsQuery } from "@/store/apis/deliveryMethods";
import { deliveryMethods } from "@/constants/deliveryMethods";
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
import { Add } from "@mui/icons-material";
import type { Product } from "@/types/Product";

interface AddProductDialogProps {
    data: Product;
}

const AddProductDialog = ({ data }: AddProductDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const { data: deliveryMethodsData, isLoading } = useGetDeliveryMethodsQuery(
        undefined,
        {
            skip: !isOpen,
        }
    );

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleSubmit = (values: any) => {
        console.log(values);
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
                        price: data.price.toFixed(2),
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
                                    <span className="font-semibold">ID: </span>
                                    <span>{data._id}</span>
                                </div>
                            </DialogContent>
                            <DialogContent className="flex flex-row justify-between">
                                <div className="flex-1 flex flex-col space-y-4">
                                    <Field
                                        name="price"
                                        validate={compose(
                                            required,
                                            minValue(0)
                                        )}
                                    >
                                        {(props) => (
                                            <TextField
                                                {...props.input}
                                                type="number"
                                                slotProps={{
                                                    input: {
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                $
                                                            </InputAdornment>
                                                        ),
                                                    },
                                                    htmlInput: {
                                                        min: 1,
                                                    },
                                                }}
                                                label="Price"
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
                                        name="shippingMethod"
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
                                                    {deliveryMethodsData &&
                                                        deliveryMethodsData.map(
                                                            (
                                                                deliveryMethod
                                                            ) => [
                                                                <ListSubheader
                                                                    key={
                                                                        deliveryMethod._id
                                                                    }
                                                                >
                                                                    {
                                                                        deliveryMethods[
                                                                            deliveryMethod
                                                                                .type
                                                                        ]
                                                                    }
                                                                </ListSubheader>,
                                                                ...deliveryMethod.providers.map(
                                                                    (
                                                                        provider
                                                                    ) => (
                                                                        <MenuItem
                                                                            key={
                                                                                provider._id
                                                                            }
                                                                            value={
                                                                                provider._id
                                                                            }
                                                                        >
                                                                            {`${provider.name} - $${provider.price}`}
                                                                        </MenuItem>
                                                                    )
                                                                ),
                                                            ]
                                                        )}
                                                    <ListSubheader>
                                                        Unavailable for
                                                        customers
                                                    </ListSubheader>
                                                    <MenuItem value="free">
                                                        ** Free shipping
                                                    </MenuItem>
                                                </Select>
                                                {props.meta.error &&
                                                    props.meta.touched && (
                                                        <FormHelperText error>
                                                            Select shipping
                                                            method
                                                        </FormHelperText>
                                                    )}
                                            </FormControl>
                                        )}
                                    </Field>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={handleClose}
                                    color="info"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="info"
                                    disabled={isLoading}
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
