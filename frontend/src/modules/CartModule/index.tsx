import DefaultLayout from "@/layouts/DefaultLayout";
import Loading from "@/components/Loading";
import CheckoutSummary from "./components/CheckoutSummary";
import EmptyCart from "./components/EmptyCart";
import CartProductItem from "./components/CartProductItem";
import useCart from "@/hooks/useCart";

const CartModule = () => {
    const {
        data,
        handleCheckout,
        handleAddDiscount,
        handleDelete,
        handleQuantityChange,
        loading,
    } = useCart();

    return (
        <Loading isLoading={loading.get}>
            <DefaultLayout>
                {data && data?.result.items.length > 0 ? (
                    <div className="flex flex-col items-center space-y-10 md:flex-row md:justify-between md:items-start md:space-x-10 md:space-y-0">
                        <div className="flex flex-col space-y-6 w-full">
                            {data.result.items.map((item, index) => (
                                <CartProductItem
                                    key={item._product?._id + "_" + index}
                                    data={item}
                                    isLoading={loading.edit}
                                    onQuantityChange={handleQuantityChange}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                        <CheckoutSummary
                            data={data.result}
                            loadingGet={loading.get}
                            loadingEdit={loading.edit}
                            handleCheckout={handleCheckout}
                            handleAddDiscount={handleAddDiscount}
                        />
                    </div>
                ) : (
                    <EmptyCart />
                )}
            </DefaultLayout>
        </Loading>
    );
};

export default CartModule;
