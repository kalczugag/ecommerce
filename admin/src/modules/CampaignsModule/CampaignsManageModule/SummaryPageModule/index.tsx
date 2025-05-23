import DetailCard from "@/components/DetailCard";
import type { FeaturedCampaign } from "@/types/FeaturedCampaign";
import { Chip } from "@mui/material";

interface SummaryPageProps {
    data: FeaturedCampaign;
}

const SummaryPageModule = ({ data }: SummaryPageProps) => {
    return (
        <DetailCard label={data.name}>
            <div className="space-y-4">
                <Chip
                    label={data.status}
                    color={data.status === "active" ? "success" : "default"}
                />
                <div>
                    <span>Code: </span>
                    <span>{data.promoCode}</span>
                </div>
            </div>
        </DetailCard>
    );
};

export default SummaryPageModule;
