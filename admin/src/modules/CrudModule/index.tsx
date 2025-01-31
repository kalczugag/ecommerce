import { ReactNode } from "react";
import CrudLayout from "@/layouts/CrudLayout";
import Table from "@/components/Table";

export interface TableColumnProps<T = any> {
    label: string;
    render: (row: T) => ReactNode;
}

interface CrudModuleProps {
    config?: {
        tableConfig: TableColumnProps[];
        tableData: any[];
        action?: (arg: string) => void;
        total?: number;
        bolder?: string;
        isLoading: boolean;
    };
    actionForm: JSX.Element;
}

const CrudModule = ({ config, actionForm }: CrudModuleProps) => {
    const hasTableConfig = config && config.tableConfig && config.tableData;

    const enhancedTableData =
        config?.tableData && config?.action
            ? config.tableData.map((row) => ({
                  ...row,
                  bolder: config.bolder || false,
                  handleDelete: () => config.action!(row._id),
              }))
            : config?.tableData;

    return (
        <CrudLayout headerPanel={actionForm}>
            {hasTableConfig && (
                <Table
                    headerOptions={config.tableConfig}
                    totalItems={config.total}
                    rowData={enhancedTableData!}
                    isLoading={config.isLoading}
                />
            )}
        </CrudLayout>
    );
};

export default CrudModule;
