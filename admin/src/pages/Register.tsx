import { useEffect } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { RegisterInput, useRegisterMutation } from "@/store";
import { enqueueSnackbar } from "notistack";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import { useTitle } from "@/hooks/useTitle";
import AuthModule from "@/modules/AuthModule";
import RegisterForm from "@/forms/RegisterForm";
import { Button } from "@mui/material";

const Register = () => {
    useTitle("Sign Up");
    const navigate = useNavigate();
    const { handleMutation } = useHandleMutation();
    const [register, { isLoading, isSuccess }] = useRegisterMutation();

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess]);

    const handleRegister = async (values: RegisterInput) => {
        handleMutation({
            values,
            mutation: register,
        });
    };

    const FormContainer = () => (
        <Form
            onSubmit={handleRegister}
            render={({ handleSubmit, form }) => (
                <form onSubmit={handleSubmit} className="space-y-8">
                    <RegisterForm isLoading={isLoading} />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={
                            !form.getFieldState("recaptcha")?.value || isLoading
                        }
                        fullWidth
                    >
                        Sign Up
                    </Button>
                </form>
            )}
        />
    );

    return (
        <AuthModule
            authContent={<FormContainer />}
            title="Sign Up"
            isLoading={isLoading}
        />
    );
};

export default Register;
