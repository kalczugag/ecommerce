import { ReactNode } from "react";
import { Divider } from "@mui/material";

interface CrudLayoutProps {
    headerPanel: ReactNode;
    children: ReactNode;
}

const CrudLayout = ({ headerPanel, children }: CrudLayoutProps) => {
    return (
        <div className="flex flex-col space-y-6 p-6 lg:py-0">
            {headerPanel}
            <Divider />
            {children}
        </div>
    );
};

export default CrudLayout;
