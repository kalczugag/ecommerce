import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-final-form";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { useTitle } from "@/hooks/useTitle";
import { login } from "@/store";
import { Button } from "@mui/material";
import AuthModule from "@/modules/AuthModule";
import LoginForm from "@/forms/LoginForm";

const Login = () => {
    const { isLoading, isSuccess } = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useTitle("Sign In");

    const handleSubmit = (values: { email: string; password: string }) => {
        dispatch(login(values));
    };

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess]);

    const FormContainer = () => (
        <Form
            onSubmit={handleSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="space-y-8">
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

    return <AuthModule authContent={<FormContainer />} title={"Sign In"} />;
};

export default Login;
