import DefaultLayout from "@/layouts/DefaultLayout";
import DetailsProductCard from "../components/DetailsProductCard";
import Loading from "@/components/Loading";
import type { Product } from "@/types/Product";

interface ReadProductModuleProps {
    config: {
        isLoading: boolean;
    };
    data?: Product;
}

const ReadProductModule = ({ config, data }: ReadProductModuleProps) => {
    const { isLoading } = config;

    return (
        <Loading isLoading={isLoading}>
            <DefaultLayout className="items-center">
                {data && <DetailsProductCard data={data} />}
            </DefaultLayout>
        </Loading>
    );
};

export default ReadProductModule;
