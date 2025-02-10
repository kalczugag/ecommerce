import { useEffect } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { RegisterInput, useRegisterMutation } from "@/store";
import { enqueueSnackbar } from "notistack";
import { useTitle } from "@/hooks/useTitle";
import AuthModule from "@/modules/AuthModule";
import RegisterForm from "@/forms/RegisterForm";
import { Button } from "@mui/material";

const Register = () => {
    const navigate = useNavigate();
    const [register, { isLoading, isSuccess }] = useRegisterMutation();
    useTitle("Sign Up");

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess]);

    const handleRegister = async (values: RegisterInput) => {
        try {
            await register(values).unwrap();
            enqueueSnackbar("Registered in successfully", {
                variant: "success",
            });
        } catch (error: any) {
            const errorMessage =
                error.data?.error || "An unexpected error occurred.";
            enqueueSnackbar(errorMessage, { variant: "error" });
        }
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
                        disabled={!form.getFieldState("recaptcha")?.value}
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
