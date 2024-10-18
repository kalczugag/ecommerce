interface AddressProps {
    street?: string;
    city?: string;
    postalCode?: number;
    country?: string;
}

const Address = ({ street, city, postalCode, country }: AddressProps) => {
    return (
        <div className="flex flex-col">
            <p>st. {street || "-"}</p>
            <p>
                {postalCode || "-"} {city || "-"}, {country || "-"}
            </p>
        </div>
    );
};

export default Address;
