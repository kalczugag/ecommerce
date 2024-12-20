import Loading from "@/components/Loading";
import Box from "@/components/Box";
import Contact from "../components/Address";
import type { Order } from "@/types/Order";
import Status from "../components/Status";
import Product from "../components/Product";

export interface ReadOrderProps {
    data?: Order;
    isLoading: boolean;
}

const ReadOrderModule = ({ data, isLoading }: ReadOrderProps) => {
    return (
        <Loading isLoading={isLoading} className="space-y-4">
            <Box>
                <Contact
                    address={{
                        street: "",
                        city: "",
                        postalCode: "00000",
                        country: "",
                        ...data?._user.address,
                    }}
                    phone={data?._user.phone || ""}
                />
            </Box>
            <Box>
                <Status status={data?.status} />
            </Box>
            {data?.items.map((item, index) => (
                <Box key={index}>
                    <Product
                        id={item._product?._id || ""}
                        imageUrl={item._product?.imageUrl[0] || ""}
                        brand={item._product?.brand || ""}
                        title={item._product?.title || ""}
                        color={item.color || ""}
                        size={item.size || ""}
                        quantity={item.quantity}
                        price={item.unitPrice}
                    />
                </Box>
            ))}
        </Loading>
    );
};

export default ReadOrderModule;
