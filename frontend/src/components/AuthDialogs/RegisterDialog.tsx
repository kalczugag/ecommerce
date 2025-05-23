import { useRef } from "react";
import { Form } from "react-final-form";
import { Link } from "react-router-dom";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import ReCAPTCHA from "react-google-recaptcha";
import { useAnalytics, getIPData } from "@/hooks/useAnalytics";
import { RegisterInput, useRegisterMutation } from "@/store";
import AuthModule from "@/modules/AuthModule";
import RegisterForm from "@/forms/RegisterForm";
import { Button, Dialog, Divider } from "@mui/material";

interface RegisterDialogProps {
    open: boolean;
    onClose: () => void;
    handleTabChange: () => void;
}

const RegisterDialog = ({
    open,
    onClose,
    handleTabChange,
}: RegisterDialogProps) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const recaptchaPromiseRef = useRef<((token: string) => void) | null>(null);
    const { handleMutation } = useHandleMutation();
    const { trackEvent } = useAnalytics();
    const [register, { isLoading }] = useRegisterMutation();

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

        const ipData = await getIPData();

        if (token)
            handleMutation({
                values: { ...values, locale: ipData },
                mutation: register,
                onSuccess: async () => {
                    trackEvent("sign_up", {
                        country: ipData.country_name,
                        flag: ipData.flag,
                    });
                    onClose();
                },
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
                            loading={isLoading}
                            loadingPosition="end"
                            fullWidth
                        >
                            Sign up
                        </Button>
                        <div className="text-sm">
                            <span>Already have an account? </span>
                            <span
                                onClick={handleTabChange}
                                className="font-semibold cursor-pointer hover:underline"
                            >
                                Sign in
                            </span>
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
        <Dialog open={open} onClose={onClose}>
            <AuthModule authContent={<FormContainer />} title="Sign up" />;
        </Dialog>
    );
};

export default RegisterDialog;
