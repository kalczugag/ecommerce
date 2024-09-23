import DefaultLayout from "@/layouts/DefaultLayout";
import { useGetRandomProductQuery } from "@/store";

const DashboardModule = () => {
    const { data } = useGetRandomProductQuery();

    const el = (
        <div className="flex flex-row space-x-2">
            <img
                src={data?.imageUrl[0]}
                alt="featured product"
                className="w-96 h-96 object-contain"
            />
            <div className="flex flex-col space-y-4 px-2 max-w-96">
                <h1 className="text-3xl font-bold">{data?.title}</h1>
                <p>{data?.description}</p>
            </div>
        </div>
    );

    return (
        <DefaultLayout featuredElement={el}>
            <div className="text-xl text-center shadow-md border-y p-10">
                here will be a slider
            </div>
        </DefaultLayout>
    );
};

export default DashboardModule;
