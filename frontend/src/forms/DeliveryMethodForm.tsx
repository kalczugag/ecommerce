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
    isLoading: boolean;
}

const DeliveryMethodForm = ({
    content,
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
                                            <FormControlLabel
                                                key={provider._id}
                                                control={
                                                    <Field
                                                        name="_deliveryMethod"
                                                        type="radio"
                                                        value={provider._id}
                                                    >
                                                        {({ input }) => (
                                                            <Radio {...input} />
                                                        )}
                                                    </Field>
                                                }
                                                label={titleVariant}
                                            />
                                            <span>
                                                $
                                                {provider.price === 0
                                                    ? "Free"
                                                    : provider.price}
                                            </span>
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
