import { ReactNode } from "react";
import Header from "../../components/Header";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            <div className="flex flex-row">{children}</div>
        </div>
    );
};

export default Layout;
