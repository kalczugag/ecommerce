import { useState } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import { compose, minValue, required } from "@/utils/validators";
import { useGetProductByIdQuery, useEditBaseItemMutation } from "@/store";
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
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { Edit, RestartAlt } from "@mui/icons-material";
import { Item } from "@/types/Order";

interface EditItemDialogProps {
    item: Item;
}

interface FormValues {
    unitPrice: number;
    quantity: number;
    size: string;
    color: string;
}

const EditItemDialog = ({ item }: EditItemDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { handleMutation } = useHandleMutation();

    const [editBaseItem, { isLoading: editLoading }] =
        useEditBaseItemMutation();
    const { data, isLoading: productLoading } = useGetProductByIdQuery(
        {
            id: item._product?._id || "",
            params: { select: "size,color" },
        },
        { skip: !item._product }
    );

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleSubmit = (values: FormValues) => {
        handleMutation({
            values: { _id: item._id, ...values },
            mutation: editBaseItem,
            successMessage: "Item updated",
            errorMessage: "Failed to update item",
        });
        handleClose();
    };

    const isLoading = productLoading || editLoading;

    return (
        <>
            <IconButton onClick={handleOpen}>
                <Edit />
            </IconButton>
            <Dialog open={isOpen} onClose={handleClose}>
                <Form
                    initialValues={{
                        unitPrice: item.unitPrice,
                        quantity: item.quantity,
                        size: item.size,
                        color: item.color,
                    }}
                    onSubmit={handleSubmit}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <DialogTitle>Edit Item</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Ensure all updates are accurate, as changes
                                    may impact order fulfillment and invoicing.
                                </DialogContentText>
                            </DialogContent>
                            <DialogContent className="flex flex-row justify-between">
                                <div className="flex-1 flex flex-col space-y-4">
                                    <Field
                                        name="unitPrice"
                                        validate={compose(
                                            minValue(0),
                                            required
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
                                            />
                                        )}
                                    </Field>

                                    <Field
                                        name="quantity"
                                        validate={compose(
                                            required,
                                            minValue(0)
                                        )}
                                    >
                                        {(props) => (
                                            <TextField
                                                {...props.input}
                                                label="Quantity"
                                                type="number"
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
                                    <FormSpy>
                                        {({ form }) => (
                                            <FormHelperText>
                                                Total: $
                                                {(
                                                    form.getState().values
                                                        .unitPrice *
                                                    form.getState().values
                                                        .quantity
                                                ).toFixed(2)}
                                            </FormHelperText>
                                        )}
                                    </FormSpy>
                                </div>

                                <Divider
                                    orientation="vertical"
                                    sx={{ marginX: 4 }}
                                    flexItem
                                />

                                <div className="flex-1 flex flex-col space-y-4">
                                    <Field name="size" type="select">
                                        {(props) => (
                                            <FormControl
                                                disabled={
                                                    isLoading ||
                                                    !data?.result.size
                                                }
                                                sx={{ minWidth: 200 }}
                                            >
                                                <InputLabel>Size</InputLabel>
                                                <Select
                                                    {...props.input}
                                                    label="Size"
                                                    MenuProps={{
                                                        slotProps: {
                                                            paper: {
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                            },
                                                        },
                                                    }}
                                                >
                                                    {data?.result &&
                                                        data.result.size.map(
                                                            (size, index) => (
                                                                <MenuItem
                                                                    key={
                                                                        size.name +
                                                                        "_" +
                                                                        index
                                                                    }
                                                                    value={
                                                                        size.name
                                                                    }
                                                                >
                                                                    {size.name}
                                                                </MenuItem>
                                                            )
                                                        )}
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="color">
                                        {(props) => (
                                            <TextField
                                                {...props.input}
                                                label="Color"
                                                slotProps={{
                                                    input: {
                                                        readOnly: true,
                                                    },
                                                }}
                                                fullWidth
                                            />
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
                                    disabled={isLoading}
                                >
                                    Save
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                />
            </Dialog>
        </>
    );
};

export default EditItemDialog;
