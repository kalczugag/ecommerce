import { useState } from "react";
import { Field } from "react-final-form";
import { Checkbox, FormControlLabel } from "@mui/material";
import { orderStatuses } from "@/constants/orderStatuses";
import { placeholderArray } from "@/utils/helpers";
import AccountLayout from "@/layouts/AccountLayout";
import Filters from "@/components/Filters";
import Loading from "@/components/Loading";
import OrdersList from "./components/OrdersList";

interface ReadOrderListModuleProps {
    userId: string;
    status: string;
    handleFilter: (value: { status: string }) => void;
}

const ReadOrderListModule = ({
    userId,
    status,
    handleFilter,
}: ReadOrderListModuleProps) => {
    const [isFetching, setIsFetching] = useState(false);

    const orderValues = Object.values(orderStatuses);
    const placeholderData = placeholderArray(2);

    const formElements = (
        <Field name="status" type="checkbox">
            {({ input }) => (
                <div className="flex flex-col">
                    {orderValues.map((status, index) => (
                        <FormControlLabel
                            key={status + "_" + index.toString()}
                            control={
                                <Checkbox
                                    onChange={(event) =>
                                        input.onChange(
                                            event.target.checked
                                                ? status.toLowerCase()
                                                : null
                                        )
                                    }
                                />
                            }
                            name={input.name}
                            value={input.value}
                            label={status}
                            disabled={isFetching}
                        />
                    ))}
                </div>
            )}
        </Field>
    );

    return (
        <Loading isLoading={isFetching}>
            <AccountLayout label="Orders">
                {/* <div className="hidden md:block">
                    <Filters
                        onSubmit={handleFilter}
                        formElements={formElements}
                        label="Order Status"
                    />
                </div> */}
                <OrdersList
                    userId={userId}
                    status={status}
                    sort="-createdAt"
                    setIsFetching={setIsFetching}
                />
            </AccountLayout>
        </Loading>
    );
};

export default ReadOrderListModule;
