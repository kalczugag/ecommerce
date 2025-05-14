import { ReactNode } from "react";

interface RowProps {
    label?: string;
    description?: string;
    component?: "h3" | "h4";
    direction?: "row" | "column";
    children: ReactNode;
}

const Row = ({
    label,
    description,
    component = "h3",
    direction = "row",
    children,
}: RowProps) => {
    const labelFontSize = component === "h3" ? "text-xl" : "text-lg";

    return (
        <>
            {label ? (
                <div className="flex flex-col space-y-4">
                    <div className="space-y-2">
                        <h2 className={`${labelFontSize} font-bold`}>
                            {label}
                        </h2>
                        {description && (
                            <p className="text-sm text-gray-600">
                                {description}
                            </p>
                        )}
                    </div>
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
