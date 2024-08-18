import { useTitle } from "@/hooks/useTitle";
import CrudModule from "@/modules/CrudModule";

const OrdersList = () => {
    useTitle("Orders");

    const sortFn = (values: any) => {
        console.log(values);
    };

    const config = {};

    return <CrudModule />;
};

export default OrdersList;
