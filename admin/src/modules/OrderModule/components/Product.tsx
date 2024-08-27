import { Image } from "@/components/TableFields";
import { Link } from "react-router-dom";

interface ProductProps {
    id: string;
    imageUrl: string;
    brand: string;
    title: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
}

const Product = ({
    id,
    imageUrl,
    brand,
    title,
    color,
    size,
    quantity,
    price,
}: ProductProps) => {
    return (
        <div className="flex flex-row items-center space-x-4">
            <Image src={imageUrl} alt={title} size="xl" variant="square" />
            <div className="flex flex-col space-y-2">
                <Link to={`/products/${id}`} className="font-bold">
                    {title}
                </Link>
                <span className="flex space-x-4 font-bold text-sm text-gray-500 dark:text-gray-400">
                    <p>Color: {color}</p>
                    <p>Size: {size}</p>
                    <p>Quantity: {quantity}</p>
                </span>
                <p>Brand: {brand}</p>
                <p>${price}</p>
            </div>
        </div>
    );
};

export default Product;
