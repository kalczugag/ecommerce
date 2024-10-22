import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-final-form";
import { LoginInput, useLoginMutation } from "@/store";
import { enqueueSnackbar } from "notistack";
import { useTitle } from "@/hooks/useTitle";
import { Button } from "@mui/material";
import AuthModule from "@/modules/AuthModule";
import LoginForm from "@/forms/LoginForm";

const Login = () => {
    const navigate = useNavigate();
    const [login, { isLoading, isSuccess }] = useLoginMutation();
    useTitle("Sign In");

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess]);

    const handleLogin = async (values: LoginInput) => {
        try {
            await login(values).unwrap();
            enqueueSnackbar("Logged in successfully", { variant: "success" });
        } catch (error: any) {
            const errorMessage =
                error.data?.error || "An unexpected error occurred.";
            enqueueSnackbar(errorMessage, { variant: "error" });
        }
    };

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
