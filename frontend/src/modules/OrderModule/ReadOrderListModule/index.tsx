import Loading from "@/components/Loading";
import DefaultLayout from "@/layouts/DefaultLayout";
import type { Order } from "@/types/Order";
import ListItem from "./components/ListItem";

interface ReadOrderListModuleProps {
    data: Order[];
    isLoading: boolean;
}

const ReadOrderListModule = ({ data, isLoading }: ReadOrderListModuleProps) => {
    return (
        <Loading isLoading={isLoading}>
            <DefaultLayout>
                {data.map((order) => (
                    <ListItem key={order._id} data={order} />
                ))}
            </DefaultLayout>
        </Loading>
    );
};

export default ReadOrderListModule;
