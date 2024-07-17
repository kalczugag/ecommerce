import ProductCard from "../ProductCard";
import type { Product } from "../../types/product";

interface ProductsListProps {
    data: Product[];
    page: number;
    rowsPerPage: number;
}

const ProductsList = ({ data, page, rowsPerPage }: ProductsListProps) => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const paginatedData = data.slice(startIndex, endIndex);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedData.map((product, index) => (
                <ProductCard
                    key={product.title + "_" + index.toString()}
                    {...product}
                />
            ))}
        </div>
    );
};

export default ProductsList;
