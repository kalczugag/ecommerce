import { useState } from "react";
import { Field } from "react-final-form";
import { useGetRolesQuery } from "@/store";
import { required, validateEmail, compose } from "@/utils/validators";
import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from "@mui/material";
import Row from "@/components/Row";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface CustomerFormProps {
    isUpdateForm?: boolean;
    isLoading: boolean;
}

const CustomerForm = ({ isUpdateForm, isLoading }: CustomerFormProps) => {
    const { data, isSuccess } = useGetRolesQuery();

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
            {/* <Field name="role"></Field>
            <Field name="birthday"></Field> */}
            <Row label="Address">
                <Field name="address.street">
                    {(props) => (
                        <TextField
                            label="Street"
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
            <Row>
                <Field name="address.city">
                    {(props) => (
                        <TextField
                            label="City"
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
                <Field name="address.state">
                    {(props) => (
                        <TextField
                            label="State"
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
                <Field name="address.postalCode">
                    {(props) => (
                        <TextField
                            label="Postal Code"
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
            <Field name="address.country">
                {(props) => (
                    <TextField
                        label="Country"
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
            <Row label="Contact">
                <Field name="phone">
                    {(props) => (
                        <TextField
                            label="Phone"
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
                <Field name="email" validate={compose(validateEmail, required)}>
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
            </Row>
            <Row label="Security">
                <Field
                    name="password"
                    validate={isUpdateForm ? undefined : required}
                >
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
                                }
                                error={props.meta.error && props.meta.touched}
                                label="Password"
                                disabled={isLoading}
                                fullWidth
                            />
                            {props.meta.error && props.meta.touched && (
                                <FormHelperText
                                    error={
                                        props.meta.error && props.meta.touched
                                    }
                                >
                                    {props.meta.error}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}
                </Field>
            </Row>
            <Row label="Roles">
                <Field name="_role" type="select" validate={required}>
                    {(props) => (
                        <FormControl fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select
                                label="Role"
                                value={props.input.value}
                                onChange={props.input.onChange}
                                error={props.meta.error && props.meta.touched}
                            >
                                {isSuccess &&
                                    data.map(({ _id, name }) => (
                                        <MenuItem key={_id} value={_id}>
                                            {name}
                                        </MenuItem>
                                    ))}
                            </Select>
                            {props.meta.error && props.meta.touched && (
                                <FormHelperText error>
                                    {props.meta.error}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}
                </Field>
            </Row>
        </div>
    );
};

export default CustomerForm;
