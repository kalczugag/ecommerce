import { ReactNode } from "react";

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return <div className="p-6 text-lg lg:py-0">{children}</div>;
};

export default DefaultLayout;
