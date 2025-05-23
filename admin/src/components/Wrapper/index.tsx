import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => {
    return <div className="flex flex-wrap gap-4 w-full">{children}</div>;
};

export default Wrapper;
