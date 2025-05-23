import { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="flex flex-col space-y-6 mx-auto text-center p-10 sm:w-96">
            {children}
        </div>
    );
};

export default AuthLayout;
