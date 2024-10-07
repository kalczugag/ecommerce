import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useStep = (): [(value: React.SetStateAction<number>) => void, number] => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialStep = parseInt(queryParams.get("step")!) || 0;

    const [step, setStep] = useState<number>(initialStep);

    useEffect(() => {
        const updatedParams = new URLSearchParams(location.search);
        updatedParams.set("step", step.toString());

        navigate(`?${updatedParams.toString()}`);
    }, [step, navigate, location.search]);

    const handleStepChange = (value: React.SetStateAction<number>) => {
        setStep(value);
    };

    return [handleStepChange, step];
};

export default useStep;
