import { Field } from "react-final-form";
import {
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
} from "@mui/material";
import { Add, Info, Remove } from "@mui/icons-material";
import {
    required,
    mustBeNumber,
    minValue,
    compose,
    maxValue,
} from "@/utils/validators";
import Row from "@/components/Row";
import type { GroupedCategories } from "@/types/Category";
import type { Product } from "@/types/Product";
import { FieldArray } from "react-final-form-arrays";

interface CustomerFormProps {
    data?: GroupedCategories;
    formValues?: Product;
    isUpdateForm?: boolean;
    isLoading: boolean;
}

const ProductForm = ({
    data,
    isLoading,
    isUpdateForm,
    formValues,
}: CustomerFormProps) => {
    const price = formValues?.price || 0;
    const discountPercent = formValues?.discountPercent || 0;
    const discountedPrice = price - (price * discountPercent) / 100;
    const quantity = formValues?.size?.length
        ? formValues.size.reduce(
              (acc, size) => acc + Number(size.quantity || 0),
              0
          )
        : 0;

    return (
        <div className="space-y-4">
            <Field name="imageUrl" validate={required}>
                {(props) => (
                    <TextField
                        label="Image URL's (Comma separated)"
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
                        multiline
                        fullWidth
                    />
                )}
            </Field>
            <Row>
                <Field name="brand" validate={required}>
                    {(props) => (
                        <TextField
                            label="Brand"
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
                <Field name="title" validate={required}>
                    {(props) => (
                        <TextField
                            label="Title"
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
                <Field name="color" validate={required}>
                    {(props) => (
                        <TextField
                            label="Color"
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
                <Field name="quantity" type="number">
                    {(props) => (
                        <TextField
                            type="number"
                            label="Quantity"
                            name={props.input.name}
                            value={quantity}
                            onChange={props.input.onChange}
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
                <Field
                    name="price"
                    type="number"
                    validate={compose(required, mustBeNumber, minValue(0))}
                >
                    {(props) => (
                        <TextField
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
                            }}
                            inputProps={{
                                min: 0,
                            }}
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
                <Field
                    name="discountPercent"
                    type="number"
                    validate={compose(minValue(0), maxValue(100))}
                >
                    {(props) => (
                        <TextField
                            type="number"
                            label="Discount Percentage"
                            name={props.input.name}
                            value={props.input.value}
                            onChange={props.input.onChange}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            %
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            inputProps={{
                                min: 0,
                                max: 100,
                            }}
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
                <Field name="discountedPrice" type="number">
                    {(props) => (
                        <TextField
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
                            name={props.input.name}
                            value={discountedPrice}
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
            <Field name="description" type="textarea">
                {(props) => (
                    <TextField
                        label="Description"
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
                        multiline
                        fullWidth
                    />
                )}
            </Field>
            <Row label="Sizes" direction="column">
                <FieldArray name="size">
                    {({ fields }) => (
                        <>
                            {fields.map((name, index) => (
                                <div key={name} className="flex space-x-4">
                                    <Field
                                        name={`${name}.name`}
                                        validate={required}
                                    >
                                        {(props) => (
                                            <TextField
                                                label="Size Name"
                                                {...props.input}
                                                error={
                                                    props.meta.error &&
                                                    props.meta.touched
                                                }
                                                helperText={
                                                    props.meta.error &&
                                                    props.meta.touched
                                                        ? props.meta.error
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
                                    >
                                        {(props) => (
                                            <TextField
                                                label="Quantity"
                                                type="number"
                                                {...props.input}
                                                error={
                                                    props.meta.error &&
                                                    props.meta.touched
                                                }
                                                helperText={
                                                    props.meta.error &&
                                                    props.meta.touched
                                                        ? props.meta.error
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
                                                }}
                                                inputProps={{
                                                    min: 0,
                                                }}
                                            />
                                        )}
                                    </Field>
                                </div>
                            ))}
                            <Button
                                variant="outlined"
                                onClick={() =>
                                    fields.push({ name: "", quantity: 0 })
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
            </Row>
            <Row label="Categories">
                <Field
                    name={
                        isUpdateForm
                            ? "topLevelCategory._id"
                            : "topLevelCategory"
                    }
                    type="select"
                    validate={required}
                >
                    {(props) => (
                        <FormControl fullWidth>
                            <InputLabel>Top Level</InputLabel>
                            <Select
                                value={props.input.value}
                                label="Top Level"
                                onChange={props.input.onChange}
                                error={props.meta.error && props.meta.touched}
                            >
                                <MenuItem value="">None</MenuItem>
                                {data?.topLevelCategories &&
                                    data?.topLevelCategories.map((cat) => (
                                        <MenuItem key={cat._id} value={cat._id}>
                                            {cat.name}
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
                <Field
                    name={
                        isUpdateForm
                            ? "secondLevelCategory._id"
                            : "secondLevelCategory"
                    }
                    type="select"
                    validate={required}
                >
                    {(props) => (
                        <FormControl fullWidth>
                            <InputLabel>Second Level</InputLabel>
                            <Select
                                value={props.input.value}
                                label="Second Level"
                                onChange={props.input.onChange}
                                disabled={!formValues?.topLevelCategory}
                                error={props.meta.error && props.meta.touched}
                            >
                                <MenuItem value="">None</MenuItem>
                                {data?.secondLevelCategories &&
                                    data?.secondLevelCategories.map((cat) => (
                                        <MenuItem key={cat._id} value={cat._id}>
                                            {cat.name}
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
                <Field
                    name={
                        isUpdateForm
                            ? "thirdLevelCategory._id"
                            : "thirdLevelCategory"
                    }
                    type="select"
                    validate={required}
                >
                    {(props) => (
                        <FormControl fullWidth>
                            <InputLabel>Third Level</InputLabel>
                            <Select
                                value={props.input.value}
                                label="Third Level"
                                onChange={props.input.onChange}
                                disabled={!formValues?.secondLevelCategory}
                                error={props.meta.error && props.meta.touched}
                            >
                                <MenuItem value="">None</MenuItem>
                                {data?.thirdLevelCategories &&
                                    data?.thirdLevelCategories.map((cat) => (
                                        <MenuItem key={cat._id} value={cat._id}>
                                            {cat.name}
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

export default ProductForm;
