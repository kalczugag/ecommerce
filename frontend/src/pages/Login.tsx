import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-final-form";
import ReCAPTCHA from "react-google-recaptcha";
import { useLoginMutation, LoginInput } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import { useAnalytics } from "@/hooks/useAnalytics";
import AuthModule from "@/modules/AuthModule";
import LoginForm from "@/forms/LoginForm";
import { Button, Divider } from "@mui/material";
import { Save } from "@mui/icons-material";

const Login = () => {
    useTitle("Sign In");
    const navigate = useNavigate();
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const recaptchaPromiseRef = useRef<((token: string) => void) | null>(null);
    const { handleMutation } = useHandleMutation();
    const { trackEvent } = useAnalytics();
    const [login, { isLoading, isSuccess }] = useLoginMutation();

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess]);

    const handleVerify = (token: string | null) => {
        if (token !== null && recaptchaPromiseRef.current) {
            recaptchaPromiseRef.current(token);
            recaptchaPromiseRef.current = null;
        }
    };

    const handleLogin = async (values: LoginInput) => {
        const token = await new Promise<string>((resolve) => {
            recaptchaPromiseRef.current = resolve;
            recaptchaRef.current?.execute();
        });

        if (token)
            handleMutation({
                values,
                mutation: login,
                onSuccess: () => {
                    trackEvent("log_in");
                },
            });
    };

    const FormContainer = () => (
        <Form
            initialValues={{
                email: "admin@test.pl",
                password: "test123",
            }}
            onSubmit={handleLogin}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="space-y-8">
                    <LoginForm isLoading={isLoading} />
                    <div className="space-y-4">
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ bgcolor: "#1c2028" }}
                            loading={isLoading}
                            fullWidth
                        >
                            Sign in
                        </Button>
                        <div className="text-sm">
                            <span>Don't have an account? </span>
                            <Link
                                to="/register"
                                className="font-semibold hover:underline"
                            >
                                Sign up
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

    return <AuthModule authContent={<FormContainer />} title={"Sign in"} />;
};

export default Login;
