import { ReactNode } from "react";
import { Container } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="md:flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <Container maxWidth="xl">{children}</Container>
            </div>
        </div>
    );
};

export default Layout;
