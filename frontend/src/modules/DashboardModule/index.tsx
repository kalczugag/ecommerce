import { useGetRandomProductQuery } from "@/store";
import DefaultLayout from "@/layouts/DefaultLayout";
import CustomCarousel from "@/components/Carousel";
import Featured from "./components/Featured";

const DashboardModule = () => {
    const { data } = useGetRandomProductQuery();

    const content = data?.map((item) => (
        <Featured
            key={item._id}
            id={item._id || ""}
            imageUrl={item.imageUrl[0]}
            title={item.title}
            description={item.description || ""}
        />
    ));

    return (
        <DefaultLayout
            featuredElement={<CustomCarousel content={content || []} />}
        >
            <div className="text-xl text-center shadow-md border-y p-10">
                here will be a carousel
            </div>
            <div className="text-xl text-center shadow-md border-y p-10">
                here will be a carousel
            </div>
            <div className="text-xl text-center shadow-md border-y p-10">
                here will be a carousel
            </div>
        </DefaultLayout>
    );
};

export default DashboardModule;
