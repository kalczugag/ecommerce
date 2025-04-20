import { useSearchParams } from "react-router-dom";
import { checkoutSteps } from "@/constants/checkoutSteps";

const useStep = (): [
    step: string,
    nextStep: () => void,
    prevStep: () => void
] => {
    const [searchParams, setSearchParams] = useSearchParams();

    const step = searchParams.get("step") || checkoutSteps[0];
    const activeStep = step ? checkoutSteps.indexOf(step) : 0;

    const nextStep = () => {
        if (activeStep < checkoutSteps.length - 1) {
            setSearchParams(
                { step: checkoutSteps[activeStep + 1] },
                { replace: true }
            );
        }
    };

    const prevStep = () => {
        if (activeStep > 0) {
            setSearchParams(
                { step: checkoutSteps[activeStep - 1] },
                { replace: true }
            );
        }
    };

    return [step, nextStep, prevStep];
};

export default useStep;
