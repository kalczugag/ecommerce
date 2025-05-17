import { useNavigate } from "react-router-dom";
import { useAddCampaignMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import CrudModule from "@/modules/CrudModule";
import CampaignForm from "@/forms/CampaignForm";
import CreateForm from "@/components/CreateForm";
import type { FeaturedCampaign } from "@/types/FeaturedCampaign";

interface FormValues {
    couponType: string;
    couponValue: number;
    startDate: Date;
    endDate: Date;
    minValue: number;
    numOfCoupons: number;
}

const CampaignsAdd = () => {
    const navigate = useNavigate();
    const { handleMutation } = useHandleMutation();

    const [addCampaign, { isLoading }] = useAddCampaignMutation();

    useTitle("Campaign - Add");

    const handleSubmit = async ({
        couponType,
        couponValue,
        ...values
    }: FormValues) => {
        handleMutation({
            values: {
                ...values,
                discount: couponValue,
                discountType: couponType,
                hidden: true,
            },
            mutation: addCampaign,
            onSuccess: (data: ApiResponseObject<FeaturedCampaign>) =>
                navigate(`/campaigns/${data.result._id}`),
        });
    };

    return (
        <CrudModule
            actionForm={
                <CreateForm
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    initialValues={{ couponType: "percentage" }}
                    formElements={<CampaignForm />}
                />
            }
        />
    );
};

export default CampaignsAdd;
