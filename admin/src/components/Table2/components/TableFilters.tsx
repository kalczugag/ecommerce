import { ReactNode } from "react";
import { Form, FormSpy } from "react-final-form";

interface TableFiltersProps {
    children: ReactNode;
    onSubmit: (values: any) => void;
}

const TableFilters = ({ children, onSubmit }: TableFiltersProps) => {
    return (
        <Form
            onSubmit={onSubmit}
            subscription={{}}
            render={({ handleSubmit, form }) => (
                <form onSubmit={handleSubmit}>
                    <FormSpy
                        subscription={{ values: true, pristine: true }}
                        onChange={({ pristine }) => {
                            if (!pristine) {
                                form.submit();
                            }
                        }}
                    />
                    {children}
                </form>
            )}
        />
    );
};

export default TableFilters;
