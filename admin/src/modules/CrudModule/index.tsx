import { ReactNode } from "react";
import { Form } from "react-final-form";
import SortForm from "@/forms/SortForm";
import CrudLayout from "@/layouts/CrudLayout";
import Table from "@/components/Table";
import type { ConfigType } from "@/forms/SortForm";

interface CrudModuleProps {
    config: ConfigType[];
    fields: {
        label: string;
        render: (row: any) => ReactNode;
    }[];
    data: any[];
    sortFn: (values: any) => void;
}

const CrudModule = ({ config, fields, data, sortFn }: CrudModuleProps) => {
    const FormContainer = () => (
        <Form
            onSubmit={sortFn}
            render={({ handleSubmit, form }) => (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4"
                >
                    <SortForm config={config} form={form} />
                </form>
            )}
        />
    );

    return (
        <CrudLayout
            headerPanel={<FormContainer />}
            topLabel="Sort"
            bottomLabel="All Products"
        >
            <Table
                headerOptions={fields}
                rowData={data}
                totalItems={55}
                isLoading={false}
            />
        </CrudLayout>
    );
};

export default CrudModule;
