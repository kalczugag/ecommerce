import { useGetFeaturedCampaignQuery } from "@/store";
import useAuth from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/DefaultLayout";
import CustomCarousel from "@/components/Carousel";
import Featured from "./components/Featured";

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
        <Featured
            key={product._id}
            id={product._id || ""}
            imageUrl={product.imageUrl[0]}
            title={product.title}
            description={product.description || ""}
        />
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
