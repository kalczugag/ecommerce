import { useRef, useState } from "react";
import { Field, FormSpy } from "react-final-form";
import { useGetRolesQuery } from "@/store";
import {
    required,
    validateEmail,
    compose,
    validateFile,
} from "@/utils/validators";
import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    Grid2 as Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    styled,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { PhotoCamera } from "@mui/icons-material";
import { countries } from "@/constants/countries";

interface CustomerFormProps {
    isUpdateForm?: boolean;
    isLoading: boolean;
}

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const CustomerForm = ({ isLoading, isUpdateForm }: CustomerFormProps) => {
    const { data, isSuccess } = useGetRolesQuery();

    const fileRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState<string | null>(null);

    return (
        <Grid container spacing={6}>
            <Grid container spacing={2} size={{ xs: 12, md: 4 }}>
                <Grid size={12} mb={2}>
                    <Field name="photo" validate={validateFile}>
                        {({ input, meta }) => (
                            <Box textAlign="center" sx={{ mt: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Profile Photo
                                </Typography>
                                <FormSpy
                                    subscription={{ values: true }}
                                    onChange={({ values }) => {
                                        const file = values["photo"];
                                        if (!file) {
                                            setPreview(null);
                                            return;
                                        }
                                        const url = URL.createObjectURL(file);
                                        setPreview(url);
                                    }}
                                />
                                {preview ? (
                                    <Avatar
                                        src={preview}
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            mx: "auto",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => fileRef.current?.click()}
                                    />
                                ) : (
                                    <Box
                                        component="label"
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            borderRadius: "50%",
                                            border: "2px dashed",
                                            borderColor: "grey.400",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            mx: "auto",
                                            "&:hover": {
                                                borderColor: "primary.main",
                                                backgroundColor: "action.hover",
                                            },
                                        }}
                                        onClick={() => fileRef.current?.click()}
                                    >
                                        <IconButton
                                            component="span"
                                            disableRipple
                                        >
                                            <PhotoCamera fontSize="large" />
                                        </IconButton>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            Upload
                                        </Typography>
                                    </Box>
                                )}
                                <VisuallyHiddenInput
                                    ref={fileRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        input.onChange(
                                            e.target.files?.[0] ?? null
                                        )
                                    }
                                />
                                {input.value && (
                                    <Typography
                                        variant="caption"
                                        display="block"
                                        mt={1}
                                    >
                                        {input.value.name}
                                    </Typography>
                                )}
                                {meta.touched && meta.error && (
                                    <FormHelperText error>
                                        {meta.error}
                                    </FormHelperText>
                                )}
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    display="block"
                                    mt={1}
                                >
                                    Allowed: .jpeg, .jpg, .png, .gif — max size
                                    3 MB
                                </Typography>
                            </Box>
                        )}
                    </Field>
                </Grid>
                <Grid size={12}>
                    <Field name="banned" type="checkbox">
                        {({ input, meta }) => (
                            <FormControl
                                component="fieldset"
                                error={meta.touched && !!meta.error}
                            >
                                <FormLabel component="legend">Banned</FormLabel>
                                <FormControlLabel
                                    sx={{ ml: 0 }}
                                    value="verified"
                                    control={
                                        <Switch {...input} color="primary" />
                                    }
                                    label={
                                        <FormHelperText sx={{ ml: 0 }}>
                                            Apply disable account
                                        </FormHelperText>
                                    }
                                    labelPlacement="start"
                                />
                            </FormControl>
                        )}
                    </Field>
                </Grid>
                <Grid size={12}>
                    <Field name="emailVerified" type="checkbox">
                        {({ input, meta }) => (
                            <FormControl
                                component="fieldset"
                                error={meta.touched && !!meta.error}
                            >
                                <FormLabel component="legend">
                                    Email verified
                                </FormLabel>
                                <FormControlLabel
                                    sx={{ ml: 0 }}
                                    value="verified"
                                    control={
                                        <Switch {...input} color="primary" />
                                    }
                                    label={
                                        <FormHelperText sx={{ ml: 0 }}>
                                            Disabling this will automatically
                                            send the user a verification email
                                        </FormHelperText>
                                    }
                                    labelPlacement="start"
                                />
                            </FormControl>
                        )}
                    </Field>
                </Grid>
                <Grid size={12}>
                    <Button color="error" variant="contained">
                        Delete customer
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} size={{ xs: 12, md: 8 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Field name="fullName" validate={required}>
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                label="Full name"
                                error={meta.error && meta.touched}
                                helperText={
                                    meta.error && meta.touched
                                        ? meta.error
                                        : null
                                }
                                disabled={isLoading}
                                fullWidth
                            />
                        )}
                    </Field>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Field
                        name="email"
                        validate={compose(required, validateEmail)}
                    >
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                label="Email address"
                                error={meta.error && meta.touched}
                                helperText={
                                    meta.error && meta.touched
                                        ? meta.error
                                        : null
                                }
                                disabled={isLoading}
                                fullWidth
                            />
                        )}
                    </Field>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Field name="phone">
                        {(props) => (
                            <MuiTelInput
                                {...props.input}
                                label="Phone number"
                                placeholder="Enter phone number"
                                defaultCountry="PL"
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
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Field name="country" validate={required}>
                        {({ input, meta }) => (
                            <Autocomplete
                                options={countries}
                                autoHighlight
                                getOptionLabel={(option) => option.label}
                                value={input.value || null}
                                onChange={(_, newValue) =>
                                    input.onChange(newValue)
                                }
                                fullWidth
                                renderOption={(props, option) => {
                                    const { key, ...optionProps } = props;
                                    return (
                                        <Box
                                            key={key}
                                            component="li"
                                            sx={{
                                                "& > img": {
                                                    mr: 2,
                                                    flexShrink: 0,
                                                },
                                            }}
                                            {...optionProps}
                                        >
                                            <img
                                                loading="lazy"
                                                width="20"
                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                alt=""
                                            />
                                            {option.label} ({option.code}) +
                                            {option.phone}
                                        </Box>
                                    );
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Choose a country"
                                        slotProps={{
                                            htmlInput: {
                                                ...params.inputProps,
                                                autoComplete: "new-password",
                                            },
                                        }}
                                        error={meta.error && meta.touched}
                                        helperText={
                                            meta.error && meta.touched
                                                ? meta.error
                                                : null
                                        }
                                    />
                                )}
                            />
                        )}
                    </Field>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Field name="region">
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                label="State/region"
                                error={meta.error && meta.touched}
                                helperText={
                                    meta.error && meta.touched
                                        ? meta.error
                                        : null
                                }
                                disabled={isLoading}
                                fullWidth
                            />
                        )}
                    </Field>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Field name="city">
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                label="City"
                                error={meta.error && meta.touched}
                                helperText={
                                    meta.error && meta.touched
                                        ? meta.error
                                        : null
                                }
                                disabled={isLoading}
                                fullWidth
                            />
                        )}
                    </Field>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Field name="street1">
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                label="Address"
                                error={meta.error && meta.touched}
                                helperText={
                                    meta.error && meta.touched
                                        ? meta.error
                                        : null
                                }
                                disabled={isLoading}
                                fullWidth
                            />
                        )}
                    </Field>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Field name="postalCode">
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                label="Zip/code"
                                error={meta.error && meta.touched}
                                helperText={
                                    meta.error && meta.touched
                                        ? meta.error
                                        : null
                                }
                                disabled={isLoading}
                                fullWidth
                            />
                        )}
                    </Field>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Field name="_role" type="select" validate={required}>
                        {(props) => (
                            <FormControl fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    label="Role"
                                    value={props.input.value}
                                    onChange={props.input.onChange}
                                    error={
                                        props.meta.error && props.meta.touched
                                    }
                                >
                                    {isSuccess &&
                                        // @ts-expect-error TS2339
                                        data.result.map(({ _id, name }) => (
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
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CustomerForm;
