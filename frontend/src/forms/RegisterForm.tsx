import { useState } from "react";
import { Field } from "react-final-form";
import { validateEmail, required, compose } from "@/utils/validators";
import ReCAPTCHA from "react-google-recaptcha";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from "@mui/material";
import Row from "@/components/Row";

interface RegisterFormProps {
    isLoading?: boolean;
}

const RegisterForm = ({ isLoading }: RegisterFormProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    return (
        <div className="space-y-4">
            <Row>
                <Field name="firstName" validate={required}>
                    {(props) => (
                        <TextField
                            label="First Name"
                            name={props.input.name}
                            value={props.input.value}
                            onChange={props.input.onChange}
                            error={props.meta.error && props.meta.touched}
                            helperText={
                                props.meta.error && props.meta.touched
                                    ? props.meta.error
                                    : null
                            }
                            disabled={isLoading}
                            fullWidth
                        />
                    )}
                </Field>
                <Field name="lastName" validate={required}>
                    {(props) => (
                        <TextField
                            label="Last Name"
                            name={props.input.name}
                            value={props.input.value}
                            onChange={props.input.onChange}
                            error={props.meta.error && props.meta.touched}
                            helperText={
                                props.meta.error && props.meta.touched
                                    ? props.meta.error
                                    : null
                            }
                            disabled={isLoading}
                            fullWidth
                        />
                    )}
                </Field>
            </Row>
            <Field name="email" validate={compose(required, validateEmail)}>
                {(props) => (
                    <TextField
                        label="Email"
                        name={props.input.name}
                        value={props.input.value}
                        onChange={props.input.onChange}
                        error={props.meta.error && props.meta.touched}
                        helperText={
                            props.meta.error && props.meta.touched
                                ? props.meta.error
                                : null
                        }
                        disabled={isLoading}
                        fullWidth
                    />
                )}
            </Field>
            <Field name="password" validate={required}>
                {(props) => (
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel
                            error={props.meta.error && props.meta.touched}
                            htmlFor="password-input"
                        >
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="password-input"
                            type={showPassword ? "text" : "password"}
                            name={props.input.name}
                            value={props.input.value}
                            onChange={props.input.onChange}
                            endAdornment={
                                props.input.values && (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                            error={props.meta.error && props.meta.touched}
                            label="Password"
                            disabled={isLoading}
                            fullWidth
                        />
                        {props.meta.error && props.meta.touched && (
                            <FormHelperText
                                error={props.meta.error && props.meta.touched}
                            >
                                {props.meta.error}
                            </FormHelperText>
                        )}
                    </FormControl>
                )}
            </Field>
        </div>
    );
};

export default RegisterForm;
