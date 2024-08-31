import { ReactNode } from "react";

const Row = ({ children }: { children: ReactNode }) => {
    return <div className="flex space-x-2">{children}</div>;
};

export default Row;
