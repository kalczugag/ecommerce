import CrudLayout from "@/layouts/CrudLayout";
import Table from "@/components/Table";

export interface TableColumnProps {
    label: string;
    render: (row: any) => JSX.Element | string;
}

interface CrudModuleProps {
    config?: {
        tableConfig: TableColumnProps[];
        tableData: any[];
        isLoading: boolean;
    };
    actionForm: JSX.Element;
}

const CrudModule = ({ config, actionForm }: CrudModuleProps) => {
    const hasTableConfig = config && config.tableConfig && config.tableData;

    return (
        <CrudLayout headerPanel={actionForm}>
            {hasTableConfig && (
                <Table
                    headerOptions={config.tableConfig}
                    rowData={config.tableData}
                    isLoading={config.isLoading}
                />
            )}
        </CrudLayout>
    );
};

export default CrudModule;
