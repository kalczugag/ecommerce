import { useEffect, useRef } from "react";
import { Form } from "react-final-form";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { RegisterInput, useRegisterMutation } from "@/store";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import { useTitle } from "@/hooks/useTitle";
import AuthModule from "@/modules/AuthModule";
import RegisterForm from "@/forms/RegisterForm";
import { Button, Divider } from "@mui/material";

const Register = () => {
    useTitle("Sign Up");
    const navigate = useNavigate();
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const recaptchaPromiseRef = useRef<((token: string) => void) | null>(null);
    const { handleMutation } = useHandleMutation();
    const [register, { isLoading, isSuccess }] = useRegisterMutation();

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess]);

    const handleVerify = (token: string | null) => {
        if (token !== null && recaptchaPromiseRef.current) {
            recaptchaPromiseRef.current(token);
            recaptchaPromiseRef.current = null;
        }
    };

    const handleRegister = async (values: RegisterInput) => {
        const token = await new Promise<string>((resolve) => {
            recaptchaPromiseRef.current = resolve;
            recaptchaRef.current?.execute();
        });

        if (token)
            handleMutation({
                values,
                mutation: register,
            });
    };

    const FormContainer = () => (
        <Form
            onSubmit={handleRegister}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="space-y-8">
                    <RegisterForm isLoading={isLoading} />
                    <div className="space-y-4">
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ bgcolor: "#1c2028" }}
                            disabled={isLoading}
                            fullWidth
                        >
                            Sign up
                        </Button>
                        <div className="text-sm">
                            <span>Already have and account? </span>
                            <Link
                                to="/login"
                                className="font-semibold hover:underline"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>

                    <Divider>or</Divider>

                    <div className="space-y-4">
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={
                                <img
                                    src="/icons/google.svg "
                                    alt="google"
                                    width={24}
                                    height={24}
                                />
                            }
                            fullWidth
                        >
                            Sign in with Google
                        </Button>
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={
                                <img
                                    src="/icons/facebook.svg "
                                    alt="google"
                                    width={24}
                                    height={24}
                                />
                            }
                            fullWidth
                        >
                            Sign in with Facebook
                        </Button>
                    </div>
                    <ReCAPTCHA
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        size="invisible"
                        ref={recaptchaRef}
                        onChange={handleVerify}
                    />
                </form>
            )}
        />
    );

    return (
        <AuthModule
            authContent={<FormContainer />}
            title="Sign up"
            isLoading={isLoading}
        />
    );
};

export default Register;
