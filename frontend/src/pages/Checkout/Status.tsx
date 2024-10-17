import NotFound from "@/components/NotFound";
import useStep from "@/modules/CheckoutModule/hooks/useStep";

const CheckoutStatus = () => {
    const [activeStep] = useStep();

    return (
        <div>
            {activeStep === "success" ? (
                <div>success</div>
            ) : activeStep === "cancel" ? (
                <div>cancelled</div>
            ) : (
                <NotFound />
            )}
        </div>
    );
};

export default CheckoutStatus;
