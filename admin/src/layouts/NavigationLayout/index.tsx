import { ReactNode } from "react";
import Sidebar from "../../components/Sidebar";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-row">
            <Sidebar />
            <div className="p-6 text-lg">{children}</div>
        </div>
    );
};

export default Layout;
