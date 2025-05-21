import { useState } from "react";
import { Field } from "react-final-form";
import dayjs from "dayjs";
import { required, mustBeNumber, compose } from "@/utils/validators";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Grid,
    Button,
    Link,
    TextField,
    InputAdornment,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Row from "@/components/Row";

const quotaValues = [20, 50, 100, 200, 300, 400, 500];
const percentageValues = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85,
];

const quota = (value: number) => `$${value}`;
const percentage = (value: number) => `${value}%`;

const CampaignConfigurationForm = () => {
    const [couponType, setCouponType] = useState<"percentage" | "quota">(
        "percentage"
    );
    const [showAllOptions, setShowAllOptions] = useState(false);

    return (
        <>
            {/* <Row label="Campaign name">
                <Field name="name" validate={required}>
                    {({ input, meta }) => (
                        <TextField
                            label="Name"
                            name={input.name}
                            value={input.value}
                            onChange={input.onChange}
                            error={meta.error && meta.touched}
                            helperText={
                                meta.error && meta.touched ? meta.error : null
                            }
                            fullWidth
                        />
                    )}
                </Field>
            </Row> */}
            <Row
                label="Campaign duration"
                description="Specify when the coupon can be collected and redeemed."
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Field name="startDate" validate={required}>
                        {({ input, meta }) => {
                            const value = input.value
                                ? dayjs(input.value)
                                : null;

                            return (
                                <DatePicker
                                    label="Start Date"
                                    value={value}
                                    onChange={input.onChange}
                                    slotProps={{
                                        textField: {
                                            error: meta.error && meta.touched,
                                            helperText:
                                                meta.error && meta.touched
                                                    ? meta.error
                                                    : null,
                                        },
                                    }}
                                />
                            );
                        }}
                    </Field>
                    <Field name="endDate" validate={required}>
                        {({ input, meta }) => {
                            const value = input.value
                                ? dayjs(input.value)
                                : null;

                            return (
                                <DatePicker
                                    label="End Date"
                                    value={value}
                                    onChange={input.onChange}
                                    slotProps={{
                                        textField: {
                                            error: meta.error && meta.touched,
                                            helperText:
                                                meta.error && meta.touched
                                                    ? meta.error
                                                    : null,
                                        },
                                    }}
                                />
                            );
                        }}
                    </Field>
                </LocalizationProvider>
            </Row>
            <Row direction="column" label="Campaign details">
                <FormControl>
                    <FormLabel>Coupon value</FormLabel>
                    <Field name="couponType">
                        {({ input }) => (
                            <RadioGroup
                                {...input}
                                row
                                value={couponType}
                                onChange={(e) => {
                                    setCouponType(
                                        e.target.value as "percentage" | "quota"
                                    );
                                    input.onChange(e.target.value);
                                    setShowAllOptions(false);
                                }}
                            >
                                <FormControlLabel
                                    value="quota"
                                    control={<Radio />}
                                    label="Quota"
                                />
                                <FormControlLabel
                                    value="percentage"
                                    control={<Radio />}
                                    label="Percentage"
                                />
                            </RadioGroup>
                        )}
                    </Field>
                </FormControl>
                <Field name="couponValue">
                    {({ input }) => (
                        <Grid container spacing={1} sx={{ mt: 1 }}>
                            {(couponType === "percentage"
                                ? percentageValues
                                : quotaValues
                            )
                                .slice(0, !showAllOptions ? 5 : undefined)
                                .map((value) => (
                                    <Grid item xs={4} sm={2} key={value}>
                                        <Button
                                            variant={
                                                input.value === value
                                                    ? "contained"
                                                    : "outlined"
                                            }
                                            fullWidth
                                            size="small"
                                            onClick={() =>
                                                input.onChange(value)
                                            }
                                            sx={{
                                                backgroundColor:
                                                    input.value === value
                                                        ? "primary.main"
                                                        : "transparent",
                                                color:
                                                    input.value === value
                                                        ? "white"
                                                        : "text.primary",
                                                border: "1px solid #ccc",
                                                borderColor:
                                                    input.value === value
                                                        ? "primary.main"
                                                        : "#ccc",
                                                textTransform: "none",
                                                "&:hover": {
                                                    backgroundColor:
                                                        input.value === value
                                                            ? "primary.dark"
                                                            : "#f5f5f5",
                                                    borderColor:
                                                        input.value === value
                                                            ? "primary.dark"
                                                            : "#ccc",
                                                },
                                                height: "36px",
                                                fontSize: "14px",
                                                minWidth: 0,
                                                padding: "4px 12px",
                                            }}
                                        >
                                            {couponType === "percentage"
                                                ? percentage(value)
                                                : quota(value)}
                                        </Button>
                                    </Grid>
                                ))}
                            <Grid item xs={4} sm={2}>
                                <Link
                                    component="button"
                                    type="button"
                                    variant="body2"
                                    onClick={() =>
                                        setShowAllOptions(!showAllOptions)
                                    }
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "36px",
                                        color: "primary.main",
                                        textDecoration: "none",
                                        "&:hover": {
                                            textDecoration: "underline",
                                        },
                                    }}
                                >
                                    {!showAllOptions ? "Show all" : "Show less"}
                                </Link>
                            </Grid>
                        </Grid>
                    )}
                </Field>
            </Row>
            <Row
                label="Minimum order value"
                description="You can optionally specify the total minimum value of the offers covered by the coupon needed to redeem the coupon. Remember that the buyer will also have to buy at least 2 items from this campaign."
            >
                <Field
                    name="minPrice"
                    validate={compose(required, mustBeNumber)}
                    type="number"
                >
                    {(props) => (
                        <TextField
                            label="Minimum order value"
                            type="number"
                            name={props.input.name}
                            value={props.input.value}
                            onChange={props.input.onChange}
                            sx={{ maxWidth: 300 }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            $
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            error={props.meta.error && props.meta.touched}
                            helperText={
                                props.meta.error && props.meta.touched
                                    ? props.meta.error
                                    : "Minimum $5"
                            }
                            fullWidth
                        />
                    )}
                </Field>
            </Row>
            <Row
                label="Number of coupons"
                description="Define the pool of coupons available to buyers."
            >
                <Field
                    name="numOfCoupons"
                    validate={compose(required, mustBeNumber)}
                    type="number"
                >
                    {(props) => (
                        <TextField
                            label="Number of coupons"
                            type="number"
                            name={props.input.name}
                            value={props.input.value}
                            onChange={props.input.onChange}
                            sx={{ maxWidth: 300 }}
                            error={props.meta.error && props.meta.touched}
                            helperText={
                                props.meta.error && props.meta.touched
                                    ? props.meta.error
                                    : null
                            }
                            fullWidth
                        />
                    )}
                </Field>
            </Row>
        </>
    );
};

export default CampaignConfigurationForm;
