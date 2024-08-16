import { useParams } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";

const ProductsEdit = () => {
    const { id } = useParams();
    useTitle("Products - Edit");

    return <div>edit - {id}</div>;
};

export default ProductsEdit;
