import { Link } from "react-router-dom";
import type { Product } from "../../types/product";

const ProductCard = (data: Product) => {
    return (
        <Link to={"dd"} className="flex flex-col">
            <div className="image-container">
                <img
                    src={data.imageUrl}
                    alt={data.title}
                    loading="lazy"
                    className="max-h-[450px]"
                />
            </div>
            <div className="flex flex-col py-4 w-full">
                <h3 className="text-gray-600 font-bold">{data.title}</h3>
                <p className="text-sm">
                    {data.description?.slice(0, 50) + "..."}
                </p>
                <div className="text-sm text-gray-600">{data.color}</div>
                <p className="product-price">${+data.price.toFixed(2) / 10}</p>
            </div>
        </Link>
    );
};

export default ProductCard;
