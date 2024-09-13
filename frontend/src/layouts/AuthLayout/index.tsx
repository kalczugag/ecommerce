import { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="flex flex-col space-y-6 mx-auto text-center rounded shadow-md border p-10 mt-10 dark:border-0 dark:bg-darker sm:w-96">
            {children}
        </div>
    );
};

export default AuthLayout;
