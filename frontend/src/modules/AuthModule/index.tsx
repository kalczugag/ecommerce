import { Link, useLocation } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";

interface AuthModuleProps {
    authContent: JSX.Element;
    title: string;
}

const AuthModule = ({ authContent, title }: AuthModuleProps) => {
    const { pathname } = useLocation();

    const conditionalLabel = (loginText: string, registerText: string) => {
        return pathname === "/login" ? loginText : registerText;
    };

    const linkPath = pathname === "/login" ? "/register" : "/login";
    const linkText = pathname === "/login" ? "Create an account" : "Sign In";

    return (
        <AuthLayout>
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            {authContent}
            <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-text-light dark:text-gray-400">
                        {conditionalLabel(
                            "Don't have an account?",
                            "Already have an account?"
                        )}
                    </span>
                    <Link to={linkPath} className="font-bold hover:opacity-90">
                        {linkText}
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
};

export default AuthModule;
