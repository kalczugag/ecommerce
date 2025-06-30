import { ReactNode } from "react";
import { Form } from "react-final-form";

interface TableFiltersProps {
    children?: ReactNode;
    onSubmit?: (values: any) => void;
}

const TableFilters = ({ children, onSubmit }: TableFiltersProps) => {
    return (
        <Form
            onSubmit={() => {}}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>{children}</form>
            )}
        />
    );
};

export default TableFilters;
