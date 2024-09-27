import DefaultLayout from "@/layouts/DefaultLayout";
import type { Cart } from "@/types/Cart";
import Loading from "@/components/Loading";
import CheckoutSummary from "./components/CheckoutSummary";
import EmptyCart from "./components/EmptyCart";
import CartProductItem from "./components/CartProductItem";
import { Product } from "@/types/Product";
import { Item } from "@/types/Cart";

const testProduct: Product = {
    _id: "prod_12345",
    imageUrl: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
    ],
    brand: "BrandName",
    title: "Awesome Product",
    color: "Red",
    discountedPrice: 80, // Optional if discounted
    price: 100,
    discountPercent: 20,
    size: [
        {
            name: "M",
            quantity: 10,
        },
        {
            name: "L",
            quantity: 5,
        },
    ],
    quantity: 15, // Overall product stock quantity
    topLevelCategory: "Apparel",
    secondLevelCategory: "Men's Clothing",
    thirdLevelCategory: "Shirts",
    description: "This is a great product description.",
};

// Sample Item
const testItem: Item = {
    product: testProduct,
    color: "Red",
    size: "M",
    unitPrice: 80, // The discounted price
    quantity: 2,
};

// Sample Cart
const testCart: Cart = {
    _id: "cart_67890",
    _user: "user_001", // Could be a user ID or a full User object
    _products: [testItem],
    subTotal: 160, // 80 * 2
    discount: 40, // 20% off from the original price (100 * 2 - 160)
    deliveryCost: 5,
    total: 165, // subTotal - discount + deliveryCost
};

interface CartModuleProps {
    data?: Cart;
    isLoading: boolean;
}

const CartModule = ({ data, isLoading }: CartModuleProps) => {
    return (
        <Loading isLoading={isLoading}>
            <DefaultLayout>
                {testCart && testCart?._products.length > 0 ? (
                    <div className="flex justify-between space-x-10">
                        {testCart._products.map((product) => (
                            <CartProductItem data={product} />
                        ))}
                        <CheckoutSummary data={testCart} />
                    </div>
                ) : (
                    <EmptyCart />
                )}
            </DefaultLayout>
        </Loading>
    );
};

export default CartModule;
