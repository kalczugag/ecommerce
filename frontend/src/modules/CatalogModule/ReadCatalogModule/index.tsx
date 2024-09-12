import DefaultLayout from "@/layouts/DefaultLayout";
import DetailsProductCard from "../components/DetailsProductCard";
import Loading from "@/components/Loading";
import type { Product } from "@/types/Product";

interface ReadCatalogModuleProps {
    config: {
        isLoading: boolean;
    };
    data?: Product;
}

const ReadCatalogModule = ({ config, data }: ReadCatalogModuleProps) => {
    const { isLoading } = config;

    return (
        <Loading isLoading={isLoading}>
            <DefaultLayout className="items-center">
                {data && <DetailsProductCard data={data} />}
            </DefaultLayout>
        </Loading>
    );
};

export default ReadCatalogModule;
