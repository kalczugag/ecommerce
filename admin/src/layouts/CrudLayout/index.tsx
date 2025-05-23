import { ReactNode } from "react";
import { Divider } from "@mui/material";
import Box from "@/components/Box";

interface CrudLayoutProps {
    headerPanel: ReactNode;
    children: ReactNode;
    padding?: boolean;
}

const CrudLayout = ({ headerPanel, children, padding }: CrudLayoutProps) => {
    return (
        <div className={`flex flex-col ${padding && "md:p-6 lg:py-0"}`}>
            <Box>{headerPanel}</Box>
            <Divider sx={{ mb: "31px" }} />
            {children}
        </div>
    );
};

export default CrudLayout;
