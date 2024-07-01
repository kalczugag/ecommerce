import ProductCard from "../ProductCard";
import type { Product } from "../../types/product";

interface ProductsListProps {
    data: Product[];
}

const ProductsList = ({ data }: ProductsListProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((product, index) => (
                <ProductCard
                    key={product.title + "_" + index.toString()}
                    {...product}
                />
            ))}
        </div>
    );
};

export default ProductsList;
