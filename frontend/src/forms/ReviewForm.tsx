import { Field } from "react-final-form";
import { required } from "@/utils/validators";
import { Box, FormHelperText, Rating, TextField } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import Row from "@/components/Row";

interface ReviewFormProps {
    isMobile: boolean;
}

const labels: { [index: string]: string } = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
};

const ReviewForm = ({ isMobile }: ReviewFormProps) => {
    return (
        <div className="flex flex-col space-y-4 mt-4">
            <Field name="rating" type="number" validate={required}>
                {({ input, meta }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Rating
                            {...input}
                            value={+input.value || 0}
                            name="half-rating"
                            precision={0.5}
                            size="large"
                        />
                        <FormHelperText
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                verticalAlign: "middle",
                            }}
                            error={meta.error && meta.touched}
                        >
                            {meta.error && meta.touched && (
                                <ErrorOutline fontSize="small" />
                            )}
                            {labels[input.value] || "review product"}
                        </FormHelperText>
                    </Box>
                )}
            </Field>
            <Field name="message">
                {({ input }) => (
                    <TextField
                        {...input}
                        label="Message"
                        sx={{ minWidth: isMobile ? "100%" : 600 }}
                        helperText={`${input.value.length} / 500`}
                        rows={3}
                        slotProps={{
                            htmlInput: { maxLength: 500 },
                            formHelperText: { sx: { textAlign: "end" } },
                        }}
                        multiline
                        fullWidth
                    />
                )}
            </Field>
            <Row orientation={isMobile ? "column" : "row"}>
                <Field name="pros">
                    {({ input }) => (
                        <TextField
                            {...input}
                            label="Pros"
                            helperText="Separate entries with commas"
                            fullWidth
                        />
                    )}
                </Field>
                <Field name="cons">
                    {({ input }) => (
                        <TextField
                            {...input}
                            label="Cons"
                            helperText="Separate entries with commas"
                            fullWidth
                        />
                    )}
                </Field>
            </Row>
        </div>
    );
};

export default ReviewForm;
