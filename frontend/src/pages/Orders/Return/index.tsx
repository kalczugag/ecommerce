import OrderReturnModule from "@/modules/OrderModule/OrderReturnModule";
import { useParams } from "react-router-dom";

const OrderReturn = () => {
    const { id } = useParams();

    return <OrderReturnModule />;
};

export default OrderReturn;
