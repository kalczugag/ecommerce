import { useEffect } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setCredentials, useRegisterMutation } from "@/store";
import { RegisterInput } from "@/store/auth/authApiSlice";
import { Button } from "@mui/material";
import AuthModule from "@/modules/AuthModule";
import RegisterForm from "@/forms/RegisterForm";

const Register = () => {
    const navigate = useNavigate();

    const [register, { isLoading, isSuccess }] = useRegisterMutation();
    const dispatch = useAppDispatch();

    useTitle("Sign Up");

    const handleSubmit = (values: RegisterInput) => {
        register(values);
    };

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess]);

    const FormContainer = () => (
        <Form
            onSubmit={handleSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="space-y-8">
                    <RegisterForm isLoading={isLoading} />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        fullWidth
                    >
                        Sign Up
                    </Button>
                </form>
            )}
        />
    );

    return <AuthModule authContent={<FormContainer />} title="Sign Up" />;
};

export default Register;
