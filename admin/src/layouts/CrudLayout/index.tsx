import { ReactNode } from "react";
import { Divider } from "@mui/material";

interface CrudLayoutProps {
    headerPanel: JSX.Element;
    topLabel?: string;
    bottomLabel?: string;
    children: ReactNode;
}

const LabelledContent = (label: string, content: JSX.Element | ReactNode) => {
    return (
        <div className="space-y-2">
            <h1 className="text-xl">{label}</h1>
            {content}
        </div>
    );
};

const CrudLayout = ({
    headerPanel,
    topLabel,
    bottomLabel,
    children,
}: CrudLayoutProps) => {
    return (
        <div className="flex flex-col space-y-6 px-6">
            {topLabel ? LabelledContent(topLabel, headerPanel) : headerPanel}
            <Divider />
            {bottomLabel ? LabelledContent(bottomLabel, children) : children}
        </div>
    );
};

export default CrudLayout;
