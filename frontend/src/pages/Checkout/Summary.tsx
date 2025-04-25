import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SummaryModule from "@/modules/CheckoutModule/SummaryModule";

const Summary = () => {
    const [_, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams({ step: "summary" });
    }, []);

    return <SummaryModule />;
};

export default Summary;
