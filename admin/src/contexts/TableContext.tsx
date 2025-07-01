import { createContext, useContext } from "react";
import { Table } from "@tanstack/react-table";

const TableContext = createContext<Table<any> | null>(null);

export const useTableContext = <T extends object>() => {
    const table = useContext<Table<T> | null>(TableContext);

    if (!table) {
        throw new Error("useTableContext must be used within a TableProvider");
    }

    return table;
};

export default TableContext;
