import AuthLayout from "@/layouts/AuthLayout";

interface AuthModuleProps {
    authContent: JSX.Element;
    title: string;
}

const AuthModule = ({ authContent, title }: AuthModuleProps) => {
    return (
        <AuthLayout>
            <h1 className="text-3xl font-bold mb-4 text-left">{title}</h1>
            {authContent}
        </AuthLayout>
    );
};

export default AuthModule;
