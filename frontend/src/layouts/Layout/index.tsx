import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="relative flex flex-col min-h-screen">
            <Header topLabel={"Get free delivery on orders over $100"} />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
