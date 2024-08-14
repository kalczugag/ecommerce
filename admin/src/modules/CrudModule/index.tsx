import { ReactNode } from "react";
import CrudLayout from "@/layouts/CrudLayout";
import Table from "@/components/Table";

interface CrudModuleProps {
    config: {
        topLabel?: string;
        bottomLabel?: string;
    };
    actionForm: ReactNode;
    fields?: {
        label: string;
        render: (row: any) => ReactNode;
    }[];
    data?: any[];
    formOnly?: boolean;
    handleSubmit: (values: any) => void;
}

const CrudModule = ({
    config: { topLabel, bottomLabel },
    actionForm,
    fields = [],
    data = [],
    formOnly,
}: CrudModuleProps) => {
    return (
        <CrudLayout
            headerPanel={actionForm}
            topLabel={topLabel}
            bottomLabel={bottomLabel}
        >
            {!formOnly && (
                <Table
                    headerOptions={fields}
                    rowData={data}
                    totalItems={data.length}
                    isLoading={false}
                />
            )}
        </CrudLayout>
    );
};

export default CrudModule;
