import { ReactNode } from "react";
import { Divider } from "@mui/material";
import Box from "@/components/Box";

interface CrudLayoutProps {
    headerPanel: ReactNode;
    children: ReactNode;
}

const CrudLayout = ({ headerPanel, children }: CrudLayoutProps) => {
    return (
        <div className="flex flex-col md:p-6 lg:py-0">
            <Box>{headerPanel}</Box>
            <Divider sx={{ mb: "31px" }} />
            {children}
        </div>
    );
};

export default CrudLayout;
