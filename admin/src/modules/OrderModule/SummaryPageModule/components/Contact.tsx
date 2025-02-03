import type { ShippingAddress } from "@/types/Order";
import { Mail, Phone } from "@mui/icons-material";
import { Link } from "@mui/material";
import { HTMLAttributes, ReactNode } from "react";

interface ContactProps extends HTMLAttributes<HTMLDivElement> {
    label?: string;
    address?: ShippingAddress;
    contact?: {
        fullName?: string;
        email?: string;
        phone?: string;
    };
    actionButton?: ReactNode;
    additionalInfo?: ReactNode;
}

const Contact = ({
    label,
    address,
    contact,
    actionButton,
    additionalInfo,
    ...rest
}: ContactProps) => {
    const formattedLabel = label && <h4 className="font-semibold">{label}</h4>;

    return (
        <div {...rest}>
            {address && contact && (
                <div>
                    {formattedLabel}
                    <div className={label && "mt-4"}>
                        <p>{contact.fullName}</p>
                        <p>st. {address.street}</p>
                        <p>
                            {address.postalCode}, {address?.city}
                        </p>
                        <p>{address.country}</p>
                    </div>
                </div>
            )}
            {address && !contact && (
                <div>
                    {formattedLabel}
                    <div className={label && "mt-4"}>
                        <p>st. {address.street}</p>
                        <p>
                            {address.postalCode}, {address?.city}
                        </p>
                        <p>{address.country}</p>
                    </div>
                </div>
            )}
            {contact && (
                <div>
                    <div className="space-y-1 mt-2">
                        {contact.email && (
                            <p className="flex items-center space-x-1">
                                <Mail />
                                <Link
                                    color="inherit"
                                    href={`mailto:${contact?.email}`}
                                >
                                    {contact.email}
                                </Link>
                            </p>
                        )}
                        {contact.phone && (
                            <p className="flex items-center space-x-1">
                                <Phone />
                                <Link
                                    color="inherit"
                                    href={`tel:${contact.phone}`}
                                >
                                    {contact.phone}
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            )}
            {additionalInfo && <div className="mt-4">{additionalInfo}</div>}
            {actionButton && <div className="mt-4">{actionButton}</div>}
        </div>
    );
};

export default Contact;
