import { Field } from "react-final-form";
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import type { DeliveryMethod, Provider } from "@/types/DeliveryMethod";
import type { ShippingAddress } from "@/types/Order";

interface ListItemProps extends Provider {
    type: DeliveryMethod["type"];
    label: string;
}

const ListItem = ({
    type,
    label,
    name,
    price,
    estimatedDeliveryTime,
    additionalNotes,
    isAvailable,
}: ListItemProps) => {
    const address =
        type === "pickup" && (additionalNotes?.address as ShippingAddress);

    return (
        <div className="flex flex-col">
            <p>
                {label}{" "}
                <span className="text-sm text-gray-600">
                    {name} {address && `${address.street}, ${address.city}`}
                </span>
            </p>
            {/* {description && (
                <p className="text-sm text-gray-600">{description}</p>
            )} */}
        </div>
    );
};

interface DeliveryMethodFormProps {
    content: DeliveryMethod[];
    orderDeliveryCost: number;
    isLoading: boolean;
}

const DeliveryMethodForm = ({
    content,
    orderDeliveryCost,
    isLoading,
}: DeliveryMethodFormProps) => {
    return (
        <FormControl disabled={isLoading}>
            <div className="space-y-4">
                {content.map((method) => {
                    const typeToLabel =
                        method.type === "home_delivery"
                            ? "Home Delivery"
                            : method.type === "locker_delivery"
                            ? "Locker"
                            : "In Store Pickup";

                    return (
                        <div key={method._id}>
                            <h3 className="text-lg font-semibold">
                                {typeToLabel}
                            </h3>
                            <RadioGroup>
                                {method.providers.map((provider) => {
                                    const titleVariant =
                                        method.type === "home_delivery" ? (
                                            <ListItem
                                                type={method.type}
                                                label="Courier"
                                                {...provider}
                                            />
                                        ) : method.type ===
                                          "locker_delivery" ? (
                                            <ListItem
                                                type={method.type}
                                                label="Pickup"
                                                {...provider}
                                            />
                                        ) : (
                                            <ListItem
                                                type={method.type}
                                                label="Store"
                                                {...provider}
                                            />
                                        );

                                    return (
                                        <div
                                            key={provider._id}
                                            className="flex flex-row items-center justify-between"
                                        >
                                            <div className="flex flex-col py-2">
                                                <FormControlLabel
                                                    key={provider._id}
                                                    control={
                                                        <Field
                                                            name="_deliveryMethod"
                                                            type="radio"
                                                            value={provider._id}
                                                        >
                                                            {({ input }) => (
                                                                <Radio
                                                                    sx={{
                                                                        paddingY: 0,
                                                                    }}
                                                                    {...input}
                                                                />
                                                            )}
                                                        </Field>
                                                    }
                                                    label={titleVariant}
                                                />
                                                <div className="pl-8">
                                                    <p>
                                                        {`
                                                        ${
                                                            provider.estimatedDeliveryTime
                                                        } 
                                                        ${
                                                            method.type ===
                                                            "locker_delivery"
                                                                ? "at point"
                                                                : method.type ===
                                                                  "home_delivery"
                                                                ? "at you"
                                                                : ""
                                                        }
                                                    `}
                                                    </p>
                                                    {method.type ===
                                                        "locker_delivery" && (
                                                        <p className="text-sm text-gray-600">
                                                            will be delivered by{" "}
                                                            {provider.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="flex flex-col">
                                                {orderDeliveryCost === 0 &&
                                                method.type === "pickup" ? (
                                                    "Free"
                                                ) : orderDeliveryCost === 0 ? (
                                                    <>
                                                        <span className="line-through text-gray-600">
                                                            ${provider.price}
                                                        </span>
                                                        Free
                                                    </>
                                                ) : (
                                                    `$${provider.price}`
                                                )}
                                            </p>
                                        </div>
                                    );
                                })}
                            </RadioGroup>
                        </div>
                    );
                })}
            </div>
        </FormControl>
    );
};

export default DeliveryMethodForm;
