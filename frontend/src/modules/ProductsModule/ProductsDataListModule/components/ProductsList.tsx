import { placeholderArray } from "@/utils/helpers";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/Product";

interface ProductsListProps {
    data: Product[];
    isLoading: boolean;
}

const ProductsList = ({ data, isLoading }: ProductsListProps) => {
    const placeholderData = placeholderArray(8);

    return (
        <div className="grid justify-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(isLoading ? placeholderData : data).map((product, index) => (
                <ProductCard
                    key={(product?.title || "skeleton") + "_" + index}
                    data={product}
                    isLoading={isLoading}
                />
            ))}
        </div>
    );
};

export default ProductsList;
