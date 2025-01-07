import { ReactNode } from "react";
import DefaultLayout, { DefaultLayoutProps } from "../DefaultLayout";

interface AccountLayoutProps extends DefaultLayoutProps {
    label?: string;
    subLabel?: string;
    children: ReactNode;
}

const AccountLayout = ({
    children,
    label,
    subLabel,
    ...rest
}: AccountLayoutProps) => {
    return (
        <DefaultLayout
            marginY={false}
            {...rest}
            className={(label || subLabel) && "space-y-8"}
        >
            {(label || subLabel) && (
                <div className="space-y-2">
                    {label && <h2 className="text-3xl font-bold">{label}</h2>}
                    {subLabel && <p>{subLabel}</p>}
                </div>
            )}
            <div>{children}</div>
        </DefaultLayout>
    );
};

export default AccountLayout;
