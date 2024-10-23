import { Link } from "react-router-dom";
import type { Order } from "@/types/Order";
import Address from "./Address";

interface ListItemProps {
    data: Order;
}

const ListItem = ({ data }: ListItemProps) => {
    console.log(data);

    return (
        <div className="flex">
            <Link to={`/checkout/${data._id}/success`}>
                <div>{data._id}</div>
                <Address
                    street={data._user?.address?.street}
                    city={data._user?.address?.city}
                    postalCode={data._user?.address?.postalCode}
                    country={data._user?.address?.country}
                />
                <div>items: {data.items.length}</div>
            </Link>
        </div>
    );
};

export default ListItem;
