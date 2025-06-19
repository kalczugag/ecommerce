import { ReactNode } from "react";
import CrudLayout from "@/layouts/CrudLayout";
import Table, { type EnhancedTableProps } from "@/components/Table2";

export interface CrudModuleProps extends Partial<EnhancedTableProps<any>> {
    actionForm?: ReactNode;
}

const CrudModule = ({ columns, queryFn, actionForm }: CrudModuleProps) => {
    return (
        <CrudLayout headerPanel={actionForm}>
            {columns && queryFn && (
                <Table columns={columns} queryFn={queryFn} />
            )}
        </CrudLayout>
    );
};

export default CrudModule;
