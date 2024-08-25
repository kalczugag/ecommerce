import { HTMLAttributes, ReactNode } from "react";

interface DefaultLayoutProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const DefaultLayout = ({ children, ...rest }: DefaultLayoutProps) => {
    return (
        <div className={`text-lg md:p-6 lg:py-0 ${rest.className}`} {...rest}>
            {children}
        </div>
    );
};

export default DefaultLayout;
