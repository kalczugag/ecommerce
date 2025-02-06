import { ReactNode } from "react";
import { Container } from "@mui/material";
import Header from "@/components/Header";
import NavLinksMenu from "@/components/NavLinksMenu";
import { navLinks } from "@/constants/sidebarLinksConfig";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="md:flex h-screen md:overflow-hidden">
            <NavLinksMenu links={navLinks} />
            <div className="flex-1 flex flex-col">
                <Header />
                <div className="flex-1 overflow-auto">
                    <Container maxWidth="xl" className="pt-8 md:pt-0">
                        {children}
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default Layout;
