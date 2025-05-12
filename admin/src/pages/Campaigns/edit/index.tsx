import { useParams } from "react-router-dom";
import { useGetCampaignByIdQuery } from "@/store";

const CampaignsEdit = () => {
    const { id } = useParams();

    const { data } = useGetCampaignByIdQuery(id || "");

    return (
        <div>
            {data &&
                Object.entries(data.result).map(([key, value], index) => (
                    <p key={index}>
                        {key}: {JSON.stringify(value)}
                    </p>
                ))}
        </div>
    );
};

export default CampaignsEdit;
