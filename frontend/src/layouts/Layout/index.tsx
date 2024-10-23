import { ReactNode } from "react";
import Header from "@/components/Header";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header topLabel={"Get free delivery on orders over $100"} />
            {children}
        </div>
    );
};

export default Layout;
