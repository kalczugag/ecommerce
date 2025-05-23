import { HTMLAttributes, ReactNode } from "react";

interface BoxProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
}

const Box = ({ children, className = "", ...rest }: BoxProps) => {
    return (
        <div
            className={`p-4 rounded shadow-md mb-8 bg-[#F5F6FA] space-y-4 dark:bg-darker ${className}`}
            {...rest}
        >
            {children}
        </div>
    );
};

export default Box;
