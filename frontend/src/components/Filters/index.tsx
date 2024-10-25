import { HTMLAttributes, ReactNode } from "react";
import { Form } from "react-final-form";

interface FiltersProps extends HTMLAttributes<HTMLDivElement> {
    label?: string;
    formElements: ReactNode;
    onSubmit: (values: any) => void;
}

const Filters = ({
    label,
    formElements,
    className,
    onSubmit,
}: FiltersProps) => {
    return (
        <div className={`flex flex-col ${className}`}>
            {label && <h2 className="text-2xl font-bold">Filters</h2>}
            <h4 className="text-lg text-gray-500 font-semibold mt-6 mb-2">
                {label ? label : "Filters"}
            </h4>
            <Form
                onSubmit={onSubmit}
                subscription={{}}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="px-2">
                        {formElements}
                    </form>
                )}
            />
        </div>
    );
};

export default Filters;
