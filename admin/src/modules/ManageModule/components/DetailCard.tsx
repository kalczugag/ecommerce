import { ReactNode } from "react";
import { Mail, Phone } from "@mui/icons-material";
import type { ShippingAddress } from "@/types/Order";
import { Link } from "@mui/material";

interface DetailCardProps {
    label: string;
    children: ReactNode;
    address?: ShippingAddress;
    contact?: {
        fullName?: string;
        email?: string;
        phone?: string;
    };
}

const DetailCard = ({ label, children, address, contact }: DetailCardProps) => {
    return (
        <div className="flex flex-col space-y-4 w-full">
            <h3 className="text-lg bg-gray-200 p-3">{label}</h3>
            {children}
            {address && contact && (
                <div>
                    <p>{contact.fullName}</p>
                    <p>st. {address.street}</p>
                    <p>
                        {address.postalCode}, {address?.city}
                    </p>
                    <p>{address.country}</p>
                </div>
            )}
            {contact && (
                <div className="space-y-1">
                    {contact.email && (
                        <p className="flex items-center space-x-1">
                            <Mail />
                            <Link href={`mailto:${contact?.email}`}>
                                {contact.email}
                            </Link>
                        </p>
                    )}
                    {contact.phone && (
                        <p className="flex items-center space-x-1">
                            <Phone />
                            <Link href={`tel:${contact.phone}`}>
                                {contact.phone}
                            </Link>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DetailCard;
