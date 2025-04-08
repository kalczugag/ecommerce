import { ReactNode } from "react";

interface RowProps {
    label?: string;
    children: ReactNode;
    orientation?: "row" | "column";
    className?: string;
}

const Row = ({ label, children, orientation = "row", className }: RowProps) => {
    const orientationClass =
        orientation === "row" ? "flex-row space-x-2" : "flex-col space-y-2";

    return (
        <>
            {label ? (
                <div className="flex flex-col space-y-2">
                    <h2 className="text-xl font-bold">{label}</h2>
                    <div className="flex space-x-2">{children}</div>
                </div>
            ) : (
                <div className={`flex ${orientationClass} ${className}`}>
                    {children}
                </div>
            )}
        </>
    );
};

export default Row;
