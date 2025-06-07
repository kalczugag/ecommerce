import { Field } from "react-final-form";
import { required } from "@/utils/validators";
import {
    Checkbox,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    OutlinedInput,
    styled,
} from "@mui/material";

const FormGrid = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
}));

const AddressForm = () => {
    return (
        <Grid container spacing={3}>
            <Field name="firstName" validate={required}>
                {({ input, meta }) => (
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="first-name" required>
                            First name
                        </FormLabel>
                        <OutlinedInput
                            {...input}
                            id="first-name"
                            name="first-name"
                            type="name"
                            placeholder="John"
                            autoComplete="first name"
                            required
                            size="small"
                            error={meta.error && meta.touched}
                        />
                        {meta.error && meta.touched && (
                            <FormHelperText error>{meta.error}</FormHelperText>
                        )}
                    </FormGrid>
                )}
            </Field>
            <Field name="lastName" validate={required}>
                {({ input, meta }) => (
                    <FormGrid size={{ xs: 12, md: 6 }}>
                        <FormLabel htmlFor="last-name" required>
                            Last name
                        </FormLabel>
                        <OutlinedInput
                            {...input}
                            id="last-name"
                            name="last-name"
                            type="last-name"
                            placeholder="Snow"
                            autoComplete="last name"
                            required
                            size="small"
                            error={meta.error && meta.touched}
                        />
                        {meta.error && meta.touched && (
                            <FormHelperText error>{meta.error}</FormHelperText>
                        )}
                    </FormGrid>
                )}
            </Field>
            <Field name="address1" validate={required}>
                {({ input, meta }) => (
                    <FormGrid size={{ xs: 12 }}>
                        <FormLabel htmlFor="address1" required>
                            Address line 1
                        </FormLabel>
                        <OutlinedInput
                            {...input}
                            id="address1"
                            name="address1"
                            type="address1"
                            placeholder="Street name and number"
                            autoComplete="shipping address-line1"
                            required
                            size="small"
                            error={meta.error && meta.touched}
                        />
                        {meta.error && meta.touched && (
                            <FormHelperText error>{meta.error}</FormHelperText>
                        )}
                    </FormGrid>
                )}
            </Field>
            <Field name="address2">
                {({ input, meta }) => (
                    <FormGrid size={{ xs: 12 }}>
                        <FormLabel htmlFor="address2">Address line 2</FormLabel>
                        <OutlinedInput
                            {...input}
                            id="address2"
                            name="address2"
                            type="address2"
                            placeholder="Apartment, suite, unit, etc. (optional)"
                            autoComplete="shipping address-line2"
                            size="small"
                        />
                        {meta.error && meta.touched && (
                            <FormHelperText error>{meta.error}</FormHelperText>
                        )}
                    </FormGrid>
                )}
            </Field>
            <Field name="city" validate={required}>
                {({ input, meta }) => (
                    <FormGrid size={{ xs: 6 }}>
                        <FormLabel htmlFor="city" required>
                            City
                        </FormLabel>
                        <OutlinedInput
                            {...input}
                            id="city"
                            name="city"
                            type="city"
                            placeholder="New York"
                            autoComplete="City"
                            required
                            size="small"
                            error={meta.error && meta.touched}
                        />
                        {meta.error && meta.touched && (
                            <FormHelperText error>{meta.error}</FormHelperText>
                        )}
                    </FormGrid>
                )}
            </Field>
            <Field name="state" validate={required}>
                {({ input, meta }) => (
                    <FormGrid size={{ xs: 6 }}>
                        <FormLabel htmlFor="state" required>
                            State
                        </FormLabel>
                        <OutlinedInput
                            {...input}
                            id="state"
                            name="state"
                            type="state"
                            placeholder="NY"
                            autoComplete="State"
                            required
                            size="small"
                            error={meta.error && meta.touched}
                        />
                        {meta.error && meta.touched && (
                            <FormHelperText error>{meta.error}</FormHelperText>
                        )}
                    </FormGrid>
                )}
            </Field>
            <Field name="postalCode" validate={required}>
                {({ input, meta }) => (
                    <FormGrid size={{ xs: 6 }}>
                        <FormLabel htmlFor="zip" required>
                            Zip / Postal code
                        </FormLabel>
                        <OutlinedInput
                            {...input}
                            id="zip"
                            name="zip"
                            type="zip"
                            placeholder="12345"
                            autoComplete="shipping postal-code"
                            required
                            size="small"
                            error={meta.error && meta.touched}
                        />
                        {meta.error && meta.touched && (
                            <FormHelperText error>{meta.error}</FormHelperText>
                        )}
                    </FormGrid>
                )}
            </Field>
            <Field name="country" validate={required}>
                {({ input, meta }) => (
                    <FormGrid size={{ xs: 6 }}>
                        <FormLabel htmlFor="country" required>
                            Country
                        </FormLabel>
                        <OutlinedInput
                            {...input}
                            id="country"
                            name="country"
                            type="country"
                            placeholder="United States"
                            autoComplete="shipping country"
                            required
                            size="small"
                            error={meta.error && meta.touched}
                        />
                        {meta.error && meta.touched && (
                            <FormHelperText error>{meta.error}</FormHelperText>
                        )}
                    </FormGrid>
                )}
            </Field>
            <Field name="saveAddress" type="checkbox">
                {({ input }) => (
                    <FormGrid size={{ xs: 12 }}>
                        <FormControlLabel
                            control={<Checkbox {...input} name="saveAddress" />}
                            label="Use this address for payment details"
                        />
                    </FormGrid>
                )}
            </Field>
        </Grid>
    );
};

export default AddressForm;
