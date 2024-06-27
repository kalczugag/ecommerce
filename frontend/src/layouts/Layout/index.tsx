import { ReactNode } from "react";
import Header from "../../components/Header";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header deliveryBar />
            {children}
        </div>
    );
};

export default Layout;
