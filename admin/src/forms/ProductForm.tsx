import { Field } from "react-final-form";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { required, mustBeNumber, minValue, compose } from "@/utils/validators";
import Row from "@/components/Row";
import { GroupedCategories } from "@/types/Category";

interface CustomerFormProps {
    data?: GroupedCategories;
    isUpdateForm?: boolean;
    isLoading: boolean;
}

const ProductForm = ({ data, isLoading, isUpdateForm }: CustomerFormProps) => {
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
                <Field
                    name="quantity"
                    type="number"
                    defaultValue={150}
                    validate={compose(required, mustBeNumber, minValue(0))}
                >
                    {(props) => (
                        <TextField
                            label="Quantity"
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
                <Field
                    name="price"
                    type="number"
                    validate={compose(required, mustBeNumber, minValue(0))}
                >
                    {(props) => (
                        <TextField
                            label="Price"
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
                <Field name="discountedPrice" type="number">
                    {(props) => (
                        <TextField
                            label="Discounted Price"
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
                <Field name="discountPercent" type="number">
                    {(props) => (
                        <TextField
                            label="Discount Percentage"
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
                        </FormControl>
                    )}
                </Field>
            </Row>
        </div>
    );
};

export default ProductForm;
