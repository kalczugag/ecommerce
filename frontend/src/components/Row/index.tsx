import { ReactNode } from "react";

interface RowProps {
    label?: string;
    children: ReactNode;
}

const Row = ({ label, children }: RowProps) => {
    return (
        <>
            {label ? (
                <div className="flex flex-col space-y-2">
                    <h2 className="text-xl font-bold">{label}</h2>
                    <div className="flex space-x-2">{children}</div>
                </div>
            ) : (
                <div className="flex space-x-2">{children}</div>
            )}
        </>
    );
};

export default Row;
