import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-final-form";
import { LoginInput, useLoginMutation } from "@/store";
import { enqueueSnackbar } from "notistack";
import CopyToClipboard from "react-copy-to-clipboard";
import { useTitle } from "@/hooks/useTitle";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import AuthModule from "@/modules/AuthModule";
import LoginForm from "@/forms/LoginForm";
import { ContentCopy } from "@mui/icons-material";
import { Button } from "@mui/material";

const Login = () => {
    useTitle("Sign In");
    const navigate = useNavigate();
    const { handleMutation } = useHandleMutation();
    const [login, { isLoading, isSuccess }] = useLoginMutation();

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess]);

    const handleLogin = (values: LoginInput) => {
        handleMutation({
            values,
            mutation: login,
        });
    };

    const FormContainer = () => (
        <Form
            onSubmit={handleLogin}
            render={({ handleSubmit, form }) => (
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="text-gray-400">
                        <p className="font-bold">Admin demo credentials</p>
                        <p>
                            email:{" "}
                            <span className="underline">admin@test.pl</span>
                            <CopyToClipboard
                                text="admin@test.pl"
                                onCopy={(text) =>
                                    enqueueSnackbar("Copied to clipboard", {
                                        variant: "success",
                                    })
                                }
                            >
                                <ContentCopy
                                    sx={{ ml: 1, cursor: "pointer" }}
                                />
                            </CopyToClipboard>
                        </p>
                        <p>
                            password: <span className="underline">test123</span>
                            <CopyToClipboard
                                text="test123"
                                onCopy={() =>
                                    enqueueSnackbar("Copied to clipboard", {
                                        variant: "success",
                                    })
                                }
                            >
                                <ContentCopy
                                    sx={{ ml: 1, cursor: "pointer" }}
                                />
                            </CopyToClipboard>
                        </p>
                    </div>
                    <LoginForm isLoading={isLoading} />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!form.getFieldState("recaptcha")?.value}
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
