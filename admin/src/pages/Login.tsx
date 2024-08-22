import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-final-form";
import { useLoginMutation, setCredentials } from "@/store";
import { useAppDispatch } from "@/hooks/useStore";
import { useTitle } from "@/hooks/useTitle";
import { Button } from "@mui/material";
import AuthModule from "@/modules/AuthModule";
import LoginForm from "@/forms/LoginForm";

const Login = () => {
    const navigate = useNavigate();

    const [login, { isLoading, isSuccess }] = useLoginMutation();
    const dispatch = useAppDispatch();

    useTitle("Sign In");

    const handleSubmit = async (values: {
        email: string;
        password: string;
    }) => {
        await login(values)
            .unwrap()
            .then((data) =>
                dispatch(
                    setCredentials({ token: data.token, user: values.email })
                )
            );
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
