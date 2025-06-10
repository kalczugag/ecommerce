import { ReactNode, useEffect, useRef } from "react";
import { Field, FormSpy, useForm, useFormState } from "react-final-form";
import ReactQuill from "react-quill";
import { FieldArray } from "react-final-form-arrays";
import { required, mustBeNumber, minValue, compose } from "@/utils/validators";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Chip,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { Add, Cancel, ExpandMore, Info, Remove } from "@mui/icons-material";
import type { GroupedCategories } from "@/types/Category";
import type { Product } from "@/types/Product";

const tags = [
    "Hot",
    "New",
    "Sale",
    "Top Rated",
    "On Sale",
    "Best Seller",
    "Trending",
];

interface ProductFormProps {
    data?: GroupedCategories;
    formValues?: Product;
    isUpdateForm?: boolean;
    isLoading: boolean;
}

interface AccordionCardProps {
    title: string;
    subtitle: string;
    children: ReactNode;
}

const DiscountedPriceField = () => {
    const form = useForm();

    useEffect(() => {
        const unsubscribe = form.subscribe(
            ({ values }) => {
                const price = Number(values.price) || 0;
                const discountPercent =
                    Number(values.discountPercent) > 100
                        ? 100
                        : Number(values.discountPercent) || 0;

                if (price && discountPercent) {
                    const calculatedDiscountedPrice =
                        price - (price * discountPercent) / 100;

                    if (
                        calculatedDiscountedPrice !==
                        Number(values.discountedPrice)
                    ) {
                        form.change(
                            "discountedPrice",
                            calculatedDiscountedPrice.toFixed(2)
                        );
                    }
                } else if (price && values.discountedPrice !== price) {
                    form.change("discountedPrice", price.toFixed(2));
                }
            },
            { values: true }
        );

        return unsubscribe;
    }, [form]);

    return (
        <Field name="discountedPrice" type="number">
            {({ input, meta }) => (
                <TextField
                    {...input}
                    type="number"
                    label="Discounted Price"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            ),
                            readOnly: true,
                        },
                    }}
                    error={meta.error && meta.touched}
                    helperText={meta.error && meta.touched ? meta.error : null}
                    fullWidth
                />
            )}
        </Field>
    );
};

const AccordionCard = ({ title, subtitle, children }: AccordionCardProps) => {
    return (
        <Accordion
            defaultExpanded
            sx={{
                border: "none",
                "&:before": {
                    display: "none",
                },
            }}
        >
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5">{title}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {subtitle}
                    </Typography>
                </Stack>
            </AccordionSummary>
            <Divider sx={{ mb: 2 }} />
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
};

const DetailsCard = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <AccordionCard
            title="Details"
            subtitle="Title, short description, image..."
        >
            <Stack direction="column" spacing={4}>
                <Stack direction="column" spacing={2}>
                    <Field name="title" validate={required}>
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                label="Product name"
                                error={meta.error && meta.touched}
                                helperText={
                                    meta.error && meta.touched
                                        ? meta.error
                                        : null
                                }
                                fullWidth
                            />
                        )}
                    </Field>
                    <Field name="imageUrl" validate={required}>
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                label="Image URL's (Comma separated)"
                                error={meta.error && meta.touched}
                                helperText={
                                    meta.error && meta.touched
                                        ? meta.error
                                        : null
                                }
                                disabled={isLoading}
                                rows={3}
                                multiline
                                fullWidth
                            />
                        )}
                    </Field>
                </Stack>
                <Stack direction="column" spacing={2}>
                    <Typography variant="subtitle2">Content</Typography>
                    <Field name="description" type="textarea">
                        {(props) => <ReactQuill {...props.input} />}
                    </Field>
                </Stack>
            </Stack>
        </AccordionCard>
    );
};

const PropertiesCard = ({
    data,
    formValues,
    isLoading,
    isUpdateForm,
}: ProductFormProps) => {
    const form = useForm();
    const { values } = useFormState({ subscription: { values: true } });

    const prevTopLevelRef = useRef(values.topLevelCategory);
    const prevSecondLevelRef = useRef(values.secondLevelCategory);
    const isInitialLoadRef = useRef(true);

    const topLevelCondition = isUpdateForm
        ? "topLevelCategory._id"
        : "topLevelCategory";
    const secondLevelCondition = isUpdateForm
        ? "secondLevelCategory._id"
        : "secondLevelCategory";
    const thirdLevelCondition = isUpdateForm
        ? "thirdLevelCategory._id"
        : "thirdLevelCategory";

    useEffect(() => {
        if (isInitialLoadRef.current) {
            isInitialLoadRef.current = false;
            return;
        }

        if (
            prevTopLevelRef.current !== undefined &&
            prevTopLevelRef.current !== values.topLevelCategory
        ) {
            form.change(secondLevelCondition, "");
            form.resetFieldState(secondLevelCondition);

            form.change(thirdLevelCondition, "");
            form.resetFieldState(thirdLevelCondition);
        }

        prevTopLevelRef.current = values.topLevelCategory;
    }, [values.topLevelCategory, form]);

    useEffect(() => {
        if (isInitialLoadRef.current) {
            return;
        }

        if (
            prevSecondLevelRef.current !== undefined &&
            prevSecondLevelRef.current !== values.secondLevelCategory
        ) {
            form.change(thirdLevelCondition, "");
            form.resetFieldState(thirdLevelCondition);
        }

        prevSecondLevelRef.current = values.secondLevelCategory;
    }, [values.secondLevelCategory, form]);

    useEffect(() => {
        if (!isInitialLoadRef.current) {
            prevTopLevelRef.current = values.topLevelCategory;
            prevSecondLevelRef.current = values.secondLevelCategory;
        }
    }, [values.topLevelCategory, values.secondLevelCategory]);

    const quantity = formValues?.size?.length
        ? formValues.size.reduce(
              (acc, size) => acc + Number(size.quantity || 0),
              0
          )
        : 0;

    return (
        <AccordionCard
            title="Properties"
            subtitle="Additional funcitons and attributes"
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Field name="brand">
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                label="Brand"
                                error={meta.error && meta.touched}
                                helperText={
                                    meta.error && meta.touched
                                        ? meta.error
                                        : null
                                }
                                fullWidth
                            />
                        )}
                    </Field>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Field name="color">
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                label="Color"
                                error={meta.error && meta.touched}
                                helperText={
                                    meta.error && meta.touched
                                        ? meta.error
                                        : null
                                }
                                fullWidth
                            />
                        )}
                    </Field>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Field name="quantity">
                        {({ input, meta }) => (
                            <TextField
                                {...input}
                                value={quantity}
                                type="number"
                                label="Quantity"
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Tooltip title="Set sizes to change quantity">
                                                    <Info />
                                                </Tooltip>
                                            </InputAdornment>
                                        ),
                                        readOnly: true,
                                    },
                                }}
                                error={meta.error && meta.touched}
                                helperText={
                                    meta.error && meta.touched
                                        ? meta.error
                                        : null
                                }
                                fullWidth
                            />
                        )}
                    </Field>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>
                        Categories
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Field
                                type="fieldset"
                                name={topLevelCondition}
                                validate={required}
                            >
                                {({ input, meta }) => (
                                    <FormControl
                                        component="fieldset"
                                        error={meta.error && meta.touched}
                                    >
                                        <RadioGroup row {...input}>
                                            {data?.topLevelCategories.map(
                                                (top) => (
                                                    <FormControlLabel
                                                        key={top._id}
                                                        value={top._id}
                                                        control={<Radio />}
                                                        label={top.name}
                                                    />
                                                )
                                            )}
                                        </RadioGroup>
                                        {meta.error && meta.touched && (
                                            <FormHelperText>
                                                {meta.error}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            </Field>
                        </Grid>
                        <FormSpy subscription={{ values: true }}>
                            {({ values }) => {
                                const topId = isUpdateForm
                                    ? values.topLevelCategory?._id
                                    : values.topLevelCategory;

                                const seconds =
                                    data?.secondLevelCategories.filter(
                                        (sec) =>
                                            sec._parentCategory._id === topId
                                    ) || [];

                                const secondId = isUpdateForm
                                    ? values.secondLevelCategory?._id
                                    : values.secondLevelCategory;

                                const thirds =
                                    data?.thirdLevelCategories.filter(
                                        (third) =>
                                            third._parentCategory._id ===
                                            secondId
                                    ) || [];

                                return (
                                    <>
                                        <Grid item xs={12} md={6}>
                                            <Field
                                                name={secondLevelCondition}
                                                validate={required}
                                                type="select"
                                            >
                                                {({ input, meta }) => (
                                                    <FormControl
                                                        fullWidth
                                                        error={
                                                            meta.error &&
                                                            meta.touched
                                                        }
                                                    >
                                                        <InputLabel>
                                                            Second Level
                                                        </InputLabel>
                                                        <Select
                                                            {...input}
                                                            value={
                                                                input.value ||
                                                                ""
                                                            }
                                                            label="Second Level"
                                                            disabled={!topId}
                                                        >
                                                            <MenuItem value="">
                                                                None
                                                            </MenuItem>
                                                            <Divider />
                                                            {seconds?.map(
                                                                (sec) => (
                                                                    <MenuItem
                                                                        key={
                                                                            sec._id
                                                                        }
                                                                        value={
                                                                            sec._id
                                                                        }
                                                                    >
                                                                        {sec.name.replace(
                                                                            /^.*-\s?/,
                                                                            ""
                                                                        )}
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                        </Select>
                                                        {meta.error &&
                                                            meta.touched && (
                                                                <FormHelperText>
                                                                    {meta.error}
                                                                </FormHelperText>
                                                            )}
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Field
                                                name={thirdLevelCondition}
                                                validate={required}
                                                type="select"
                                            >
                                                {({ input, meta }) => (
                                                    <FormControl
                                                        fullWidth
                                                        error={
                                                            meta.error &&
                                                            meta.touched
                                                        }
                                                    >
                                                        <InputLabel>
                                                            Third Level
                                                        </InputLabel>
                                                        <Select
                                                            {...input}
                                                            value={
                                                                input.value ||
                                                                ""
                                                            }
                                                            label="Third Level"
                                                            disabled={!secondId}
                                                        >
                                                            <MenuItem value="">
                                                                None
                                                            </MenuItem>
                                                            <Divider />
                                                            {thirds?.map(
                                                                (third) => (
                                                                    <MenuItem
                                                                        key={
                                                                            third._id
                                                                        }
                                                                        value={
                                                                            third._id
                                                                        }
                                                                    >
                                                                        {
                                                                            third.name
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                        </Select>
                                                        {meta.error &&
                                                            meta.touched && (
                                                                <FormHelperText>
                                                                    {meta.error}
                                                                </FormHelperText>
                                                            )}
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Grid>
                                    </>
                                );
                            }}
                        </FormSpy>
                    </Grid>
                </Grid>
                <Grid item xs={12} mt={2}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="subtitle2">Sizes</Typography>
                        <FieldArray name="size">
                            {({ fields }) => (
                                <>
                                    {fields.map((name, index) => (
                                        <div
                                            key={name}
                                            className="flex space-x-4"
                                        >
                                            <Field
                                                name={`${name}.name`}
                                                validate={required}
                                            >
                                                {({ input, meta }) => (
                                                    <TextField
                                                        {...input}
                                                        label="Size Name"
                                                        error={
                                                            meta.error &&
                                                            meta.touched
                                                        }
                                                        helperText={
                                                            meta.error &&
                                                            meta.touched
                                                                ? meta.error
                                                                : null
                                                        }
                                                        disabled={isLoading}
                                                    />
                                                )}
                                            </Field>
                                            <Field
                                                name={`${name}.quantity`}
                                                validate={compose(
                                                    required,
                                                    mustBeNumber,
                                                    minValue(0)
                                                )}
                                                parse={(value) =>
                                                    value.trim() === ""
                                                        ? 0
                                                        : Number(value)
                                                }
                                            >
                                                {({ input, meta }) => (
                                                    <TextField
                                                        label="Quantity"
                                                        type="number"
                                                        {...input}
                                                        error={
                                                            meta.error &&
                                                            meta.touched
                                                        }
                                                        helperText={
                                                            meta.error &&
                                                            meta.touched
                                                                ? meta.error
                                                                : null
                                                        }
                                                        disabled={isLoading}
                                                        slotProps={{
                                                            input: {
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            onClick={() =>
                                                                                fields.remove(
                                                                                    index
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                isLoading
                                                                            }
                                                                        >
                                                                            <Remove />
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                ),
                                                            },
                                                            htmlInput: {
                                                                min: 0,
                                                            },
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outlined"
                                        onClick={() =>
                                            fields.push({
                                                name: "",
                                                quantity: 0,
                                            })
                                        }
                                        startIcon={<Add />}
                                        disabled={isLoading}
                                        sx={{ width: "150px" }}
                                    >
                                        Add Size
                                    </Button>
                                </>
                            )}
                        </FieldArray>
                    </Stack>
                </Grid>
                <Grid item xs={12} mt={2}>
                    <Field name="tags">
                        {({ input }) => (
                            <FormControl fullWidth>
                                <InputLabel>Tags</InputLabel>
                                <Select
                                    multiple
                                    value={input.value || []}
                                    onChange={input.onChange}
                                    input={<OutlinedInput label="Chip" />}
                                    renderValue={(selected: string[]) => (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 0.5,
                                            }}
                                        >
                                            {selected.map((tag) => (
                                                <Chip
                                                    key={tag}
                                                    label={tag}
                                                    deleteIcon={
                                                        <Cancel
                                                            onMouseDown={(
                                                                event
                                                            ) =>
                                                                event.stopPropagation()
                                                            }
                                                        />
                                                    }
                                                    onDelete={() => {
                                                        const newSelected =
                                                            selected.filter(
                                                                (t) => t !== tag
                                                            );
                                                        input.onChange(
                                                            newSelected
                                                        );
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {tags.map((tag) => (
                                        <MenuItem key={tag} value={tag}>
                                            {tag}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </Field>
                </Grid>
            </Grid>
        </AccordionCard>
    );
};

const PricingCard = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <AccordionCard title="Pricing" subtitle="Price related inputs">
            <Stack direction="column" spacing={4}>
                <Field
                    name="price"
                    type="number"
                    validate={compose(required, mustBeNumber, minValue(0))}
                    parse={(value) => (value.trim() === "" ? 0 : Number(value))}
                >
                    {({ input, meta }) => (
                        <TextField
                            {...input}
                            type="number"
                            label="Price"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            $
                                        </InputAdornment>
                                    ),
                                },
                                htmlInput: { min: 0 },
                            }}
                            placeholder="0.00"
                            error={meta.error && meta.touched}
                            helperText={
                                meta.error && meta.touched ? meta.error : null
                            }
                            fullWidth
                        />
                    )}
                </Field>
                <Field
                    name="discountPercent"
                    type="number"
                    validate={compose(required, mustBeNumber, minValue(0))}
                    parse={(value) => (value.trim() === "" ? 0 : Number(value))}
                >
                    {({ input, meta }) => (
                        <TextField
                            {...input}
                            type="number"
                            label="Discount Percentage"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            %
                                        </InputAdornment>
                                    ),
                                },
                                htmlInput: { min: 0 },
                            }}
                            placeholder="0.00"
                            error={meta.error && meta.touched}
                            helperText={
                                meta.error && meta.touched ? meta.error : null
                            }
                            fullWidth
                        />
                    )}
                </Field>
                <DiscountedPriceField />
            </Stack>
        </AccordionCard>
    );
};

const ProductForm = (props: ProductFormProps) => {
    return (
        <Stack direction="column" spacing={6}>
            <DetailsCard {...props} />
            <PropertiesCard {...props} />
            <PricingCard {...props} />
        </Stack>
    );
};

export default ProductForm;
