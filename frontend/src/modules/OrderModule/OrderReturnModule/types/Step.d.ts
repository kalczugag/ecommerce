export interface StepProps {
    handleNext: (stepValues: any) => void;
    handleComplete: (stepValues: any) => void;
    handleBack: () => void;
    handleReset: () => void;
    formValues: any;
}
