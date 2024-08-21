import { Image } from "@/components/TableFields";

interface ProductProps {
    imageUrl: string;
    brand: string;
    title: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
}

const Product = ({
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
                <h3 className="font-bold">{title}</h3>
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
