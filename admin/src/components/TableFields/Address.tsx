interface AddressProps {
    address: string;
    city: string;
    postalCode: number;
    country: string;
}

const Address = ({ address, city, postalCode, country }: AddressProps) => {
    return (
        <div className="flex flex-col">
            <p>st. {address}</p>
            <p>
                {postalCode} {city}, {country}
            </p>
        </div>
    );
};

export default Address;
