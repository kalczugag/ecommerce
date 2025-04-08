import { HTMLAttributes, ReactNode } from "react";

interface DefaultLayoutProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const DefaultLayout = ({ children, ...rest }: DefaultLayoutProps) => {
    return (
        <div
            className={`text-lg pb-6 md:p-6 lg:pt-0 ${rest.className}`}
            {...rest}
        >
            {children}
        </div>
    );
};

export default DefaultLayout;
