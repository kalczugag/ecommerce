import DetailCard from "@/components/DetailCard";
import type { ManageAction } from "@/modules/ManageModule/types/Manage";
import type { Order } from "@/types/Order";
import SearchProducts from "../../components/SearchProducts";
import AdvancedSearch from "../../components/AdvancedSearch";

interface AddProductProps extends ManageAction {
    data: Order;
}

const AddProduct = ({ data, handleSubTabChange }: AddProductProps) => {
    return (
        <div className="flex flex-col space-y-4">
            <DetailCard label="Search Product">
                <SearchProducts />
                <DetailCard
                    variant="accordion"
                    label="Advanced Search Options"
                    className="px-2"
                    defaultExpanded
                >
                    <AdvancedSearch />
                </DetailCard>
            </DetailCard>
            <DetailCard label="Add Product">x</DetailCard>
        </div>
    );
};

export default AddProduct;
