import { HTMLAttributes, ReactNode } from "react";

interface DefaultLayoutProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    direction?: "row" | "column";
}

const DefaultLayout = ({
    children,
    direction = "column",
    ...rest
}: DefaultLayoutProps) => {
    return (
        <div
            className={`flex text-lg pb-6 md:p-6 lg:pt-0 ${
                direction === "column" ? "flex-col" : "flex-row"
            } ${rest.className}`}
            {...rest}
        >
            {children}
        </div>
    );
};

export default DefaultLayout;
