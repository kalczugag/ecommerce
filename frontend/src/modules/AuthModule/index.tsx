import AuthLayout from "@/layouts/AuthLayout";

interface AuthModuleProps {
    authContent: JSX.Element;
    title: string;
}

const AuthModule = ({ authContent, title }: AuthModuleProps) => {
    return (
        <AuthLayout>
            <img
                src="/icons/logo.svg"
                alt="logo"
                style={{
                    textAlign: "start",
                    height: "25px",
                    marginBottom: "20px",
                }}
            />
            <h3 className="text-2xl font-semibold mb-4 text-left">{title}</h3>
            {authContent}
        </AuthLayout>
    );
};

export default AuthModule;
