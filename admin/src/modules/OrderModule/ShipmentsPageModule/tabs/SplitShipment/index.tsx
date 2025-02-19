import { Button } from "@mui/material";
import Table from "@/components/Table";
import AlertDialog from "@/components/AlertDialog";
import DetailCard from "@/components/DetailCard";
import { tableConfig } from "./tableConfig";
import type { Order } from "@/types/Order";
import type { ManageAction } from "@/modules/ManageModule/types/Manage";
import { Form } from "react-final-form";
import { useMemo } from "react";

interface SplitShipmentProps extends ManageAction {
    data: Order;
}

const SplitShipment = ({ data, handleSubTabChange }: SplitShipmentProps) => {
    const enhancedData = useMemo(() => {
        return data.items.map((item) => ({
            ...item,
            shipments: data.shipments,
        }));
    }, [data.items, data.shipments]);

    const handleSubmit = (values: any) => {
        console.log(values); // values.price need to be parsed to float
    };

    return (
        <DetailCard label="Split Shipment">
            <Form
                onSubmit={handleSubmit}
                render={({ handleSubmit, form }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col justify-between pb-8 space-y-4 xl:space-y-0 xl:flex-row">
                            <p className="text-sm">
                                To split a shipment, enter the quantity of
                                item(s) to move, and then select a new or
                                existing shipment.
                            </p>
                            <div className="flex space-x-1">
                                <Button
                                    variant="outlined"
                                    onClick={() => handleSubTabChange(0)}
                                >
                                    Cancel
                                </Button>
                                <AlertDialog
                                    title="Are you sure?"
                                    content="You won't be able to revert this!" // change this
                                    cancel="Cancel"
                                    confirm="Yes"
                                    onConfirm={form.submit}
                                >
                                    {(props) => (
                                        <Button
                                            variant="contained"
                                            onClick={props.open}
                                        >
                                            Move Items
                                        </Button>
                                    )}
                                </AlertDialog>
                            </div>
                        </div>
                        <Table
                            headerOptions={tableConfig}
                            totalItems={data.items.length}
                            rowData={enhancedData}
                            isLoading={false}
                        />
                    </form>
                )}
            />
        </DetailCard>
    );
};

export default SplitShipment;
