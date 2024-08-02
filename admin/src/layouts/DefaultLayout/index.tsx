import { ReactNode } from "react";

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return <div className="px-6 text-lg">{children}</div>;
};

export default DefaultLayout;
