import { useNavigate } from "react-router-dom";
import { useAddCampaignMutation } from "@/store";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import CampaignConfigurationForm from "@/forms/CampaignConfigurationForm";
import PresentationStep from "./components/PresentationStep";
import DefaultLayout from "@/layouts/DefaultLayout";
import StepperForm from "@/components/StepperForm";
import type { FeaturedCampaign } from "@/types/FeaturedCampaign";
import type { StepProps } from "@/types/Step";

interface FormValues {
    couponType: string;
    couponValue: number;
    startDate: Date;
    endDate: Date;
    minValue: number;
    numOfCoupons: number;
}

const CampaignAddModule = () => {
    const navigate = useNavigate();
    const { handleMutation } = useHandleMutation();

    const [addCampaign, { isLoading }] = useAddCampaignMutation();

    const steps = [
        {
            label: "Configuration",
            element: (props: StepProps) => <CampaignConfigurationForm />,
        },
        {
            label: "Presentation",
            element: (props: StepProps) => <PresentationStep />,
        },
    ];

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
        <DefaultLayout>
            <StepperForm
                initialValues={{ couponType: "percentage" }}
                content={steps}
                className="flex-col max-w-2xl space-y-4"
                onSubmit={handleSubmit}
            />
        </DefaultLayout>
    );
};

export default CampaignAddModule;
