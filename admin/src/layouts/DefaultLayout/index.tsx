import { HTMLAttributes, ReactNode } from "react";

interface DefaultLayoutProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const DefaultLayout = ({ children, ...rest }: DefaultLayoutProps) => {
    return (
        <div className={`p-6 text-lg lg:py-0 ${rest.className}`} {...rest}>
            {children}
        </div>
    );
};

export default DefaultLayout;
