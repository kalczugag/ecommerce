import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-final-form";
import { useLoginMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import { Button } from "@mui/material";
import AuthModule from "@/modules/AuthModule";
import LoginForm from "@/forms/LoginForm";

const Login = () => {
    const navigate = useNavigate();
    const [login, { isLoading, isSuccess }] = useLoginMutation();
    useTitle("Sign In");

    const { handleMutation: handleLogin, errorMessage } =
        useMutationHandler(login);

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess]);

    const FormContainer = () => (
        <Form
            onSubmit={handleLogin}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="text-gray-400">
                        <p className="font-bold">Admin demo credentials</p>
                        <p>
                            email:{" "}
                            <span className="underline">admin@test.pl</span>
                        </p>
                        <p>
                            password: <span className="underline">test123</span>
                        </p>
                    </div>
                    <LoginForm isLoading={isLoading} />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        fullWidth
                    >
                        Sign In
                    </Button>
                    <p>{errorMessage}</p>
                </form>
            )}
        />
    );

    return (
        <AuthModule
            authContent={<FormContainer />}
            title={"Sign In"}
            isLoading={isLoading}
        />
    );
};

export default Login;
