export interface StepProps {
    handleNext: (stepValues: any) => void;
    handleComplete: (stepValues: any) => void;
    handleBack: () => void;
    handleReset: () => void;
    formValues: any;
}

export interface StepElement {
    label: string;
    element: (props: StepProps) => JSX.Element;
}
