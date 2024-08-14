import { useState } from "react";
import { Field } from "react-final-form";
import { required, validateEmail, compose } from "@/utils/validators";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface LoginFormProps {
    isLoading?: boolean;
}

const LoginForm = ({ isLoading }: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    return (
        <div className="space-y-4">
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
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
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

export default LoginForm;
