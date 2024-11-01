import { ReactNode } from "react";

interface RowProps {
    label?: string;
    direction?: "row" | "column";
    children: ReactNode;
}

const Row = ({ label, direction = "row", children }: RowProps) => {
    return (
        <>
            {label ? (
                <div className="flex flex-col space-y-2">
                    <h2 className="text-xl font-bold">{label}</h2>
                    <div
                        className={`${
                            direction === "row"
                                ? "flex-row space-x-2"
                                : "flex-col space-y-2"
                        } flex`}
                    >
                        {children}
                    </div>
                </div>
            ) : (
                <div
                    className={`${
                        direction === "row"
                            ? "flex-row space-x-2"
                            : "flex-col space-y-2"
                    } flex`}
                >
                    {children}
                </div>
            )}
        </>
    );
};

export default Row;
