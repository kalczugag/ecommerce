import { Field } from "react-final-form";
import { required } from "@/utils/validators";
import { Button, TextField } from "@mui/material";
import AlertDialog from "@/components/AlertDialog";
import type { Shipment } from "@/types/Order";

interface EnterTrackingNumberProps {
    data: Shipment;
    handleBack: () => void;
    form: any;
}

const EnterTrackingNumber = ({
    data,
    handleBack,
    form,
}: EnterTrackingNumberProps) => {
    return (
        <div className="flex-1 space-y-4">
            <div>
                <span className="font-bold">Status: </span>
                <span>{data.status}</span>
            </div>
            <div className="space-y-4 w-full">
                <Field name="trackingNumber" validate={required}>
                    {(props) => (
                        <TextField
                            {...props.input}
                            label="Tracking Number"
                            slotProps={{
                                input: {
                                    readOnly: data.trackingNumber
                                        ? true
                                        : false,
                                },
                            }}
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
                            <Button variant="contained" onClick={props.open}>
                                Ship
                            </Button>
                        )}
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
};

export default EnterTrackingNumber;
