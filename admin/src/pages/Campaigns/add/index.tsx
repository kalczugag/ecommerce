import { useNavigate } from "react-router-dom";
import { useAddCampaignMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import CrudModule from "@/modules/CrudModule";
import CampaignForm from "@/forms/CampaignForm";
import CreateForm from "@/components/CreateForm";
import type { FeaturedCampaign } from "@/types/FeaturedCampaign";

const CampaignsAdd = () => {
    const navigate = useNavigate();
    const { handleMutation } = useHandleMutation();

    const [addCampaign, { isLoading }] = useAddCampaignMutation();

    useTitle("Campaign - Add");

    const handleSubmit = async (values: FeaturedCampaign) => {
        handleMutation({
            values,
            mutation: addCampaign,
            onSuccess: () => navigate(-1),
        });
    };

    return (
        <CrudModule
            actionForm={
                <CreateForm
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    formElements={<CampaignForm />}
                />
            }
        />
    );
};

export default CampaignsAdd;
