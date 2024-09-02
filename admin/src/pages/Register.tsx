import { useEffect } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import { useRegisterMutation } from "@/store";
import { Button } from "@mui/material";
import AuthModule from "@/modules/AuthModule";
import RegisterForm from "@/forms/RegisterForm";

const Register = () => {
    const navigate = useNavigate();
    const [register, { isLoading, isSuccess }] = useRegisterMutation();
    useTitle("Sign Up");

    const { handleMutation: handleRegister, errorMessage } =
        useMutationHandler(register);

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess]);

    const FormContainer = () => (
        <Form
            onSubmit={handleRegister}
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
                    {errorMessage && <p>{errorMessage}</p>}
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
