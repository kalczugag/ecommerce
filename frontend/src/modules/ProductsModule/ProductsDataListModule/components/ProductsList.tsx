import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/Product";

interface ProductsListProps {
    data: Product[];
    isLoading: boolean;
}

const ProductsList = ({ data, isLoading }: ProductsListProps) => {
    return (
        <div className="grid justify-items-center  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((product, index) => (
                <ProductCard
                    key={product?._id + "_" + index}
                    data={product}
                    isLoading={isLoading}
                />
            ))}
        </div>
    );
};

export default ProductsList;
