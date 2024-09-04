import { Link } from "react-router-dom";
import type { Product } from "@/types/Product";

const ProductCard = (data: Product) => {
    const price = +data.price.toFixed(2);
    let discountedPrice;

    if (data.discountPercent) {
        if (data.discountedPrice) {
            discountedPrice = +data.discountedPrice.toFixed(2);
        } else {
            discountedPrice = +(
                price -
                (price * data.discountPercent) / 100
            ).toFixed(2);
        }
    }

    return (
        <Link
            to={`/product/${data.title.toLowerCase()}}`}
            className="flex flex-col"
        >
            <div>
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
                    {data.description && data.description?.slice(0, 50) + "..."}
                </p>
                <div className="text-sm text-gray-600">{data.color}</div>
                <p className="font-semibold space-x-2">
                    {discountedPrice ? (
                        <>
                            <span>${discountedPrice}</span>
                            <span className="text-gray-500 line-through">
                                ${price}
                            </span>
                            <span className="text-green-600">
                                {data.discountPercent}% off
                            </span>
                        </>
                    ) : (
                        "$" + price
                    )}
                </p>
            </div>
        </Link>
    );
};

export default ProductCard;
