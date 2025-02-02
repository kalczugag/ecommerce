import { Form, Field } from "react-final-form";
import { required } from "@/utils/validators";
import { Button, TextField } from "@mui/material";
import AlertDialog from "@/components/AlertDialog";
import type { Shipment } from "@/types/Order";

interface EnterTrackingNumberProps {
    data: Shipment;
    handleBack: () => void;
}

const EnterTrackingNumber = ({
    data,
    handleBack,
}: EnterTrackingNumberProps) => {
    const handleSubmit = (value: { trackingNumber: string }) => {
        console.log(value.trackingNumber);
    };

    return (
        <div className="flex-1 space-y-4">
            <div>
                <span className="font-bold">Status: </span>
                <span>{data.status}</span>
            </div>
            <div className="flex-1 flex space-x-1">
                <Form
                    onSubmit={handleSubmit}
                    render={({ handleSubmit, form }) => (
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 w-full"
                        >
                            <Field name="trackingNumber" validate={required}>
                                {(props) => (
                                    <TextField
                                        {...props.input}
                                        label="Tracking Number"
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
                            <div className="flex space-x-1">
                                <Button variant="outlined" onClick={handleBack}>
                                    Cancel
                                </Button>
                                <AlertDialog
                                    title="Are you sure?"
                                    content="You won't be able to revert this!"
                                    cancel="Cancel"
                                    confirm="Yes"
                                    onConfirm={form.submit}
                                >
                                    {(props) => (
                                        <Button
                                            variant="contained"
                                            onClick={props.open}
                                        >
                                            Ship
                                        </Button>
                                    )}
                                </AlertDialog>
                            </div>
                        </form>
                    )}
                />
            </div>
        </div>
    );
};

export default EnterTrackingNumber;
