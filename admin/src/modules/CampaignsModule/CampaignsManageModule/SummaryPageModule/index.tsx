import DetailCard from "@/components/DetailCard";
import type { FeaturedCampaign } from "@/types/FeaturedCampaign";

interface SummaryPageProps {
    data: FeaturedCampaign;
}

const SummaryPageModule = ({ data }: SummaryPageProps) => {
    return <DetailCard label={data.name}>x</DetailCard>;
};

export default SummaryPageModule;
