import AuthLayout from "@/layouts/AuthLayout";
import Loading from "@/components/Loading";

interface AuthModuleProps {
    authContent: JSX.Element;
    title: string;
    isLoading: boolean;
}

const AuthModule = ({ authContent, title, isLoading }: AuthModuleProps) => {
    return (
        <Loading isLoading={isLoading}>
            <AuthLayout>
                <h1 className="text-3xl font-bold mb-4 text-left">{title}</h1>
                {authContent}
            </AuthLayout>
        </Loading>
    );
};

export default AuthModule;
