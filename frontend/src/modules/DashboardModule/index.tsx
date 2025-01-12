import { useGetFeaturedCampaignQuery } from "@/store";
import useAuth from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/DefaultLayout";
import CustomCarousel from "@/components/Carousel";
import Product from "@/components/ProductCard";

const DashboardModule = () => {
    const { token } = useAuth();

    const options = {
        populate:
            "products.title,products.brand,products.description,products.imageUrl",
    };

    const { data } = useGetFeaturedCampaignQuery(options, {
        skip: !token,
    });

    const content = data?.data[0].products.map((product) => (
        // <Product key={product._id} data={product} />
        <div className="text-center" key={product._id}>
            {product.title || ""}
        </div>
    ));

    return (
        <DefaultLayout
            featuredElement={<CustomCarousel content={content || []} />}
        >
            <div></div>
        </DefaultLayout>
    );
};

export default DashboardModule;
