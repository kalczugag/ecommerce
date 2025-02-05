import {
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { Field } from "react-final-form";

const SearchProducts = () => {
    return (
        <div className="flex flex-row justify-between">
            <div className="flex-1 flex flex-col space-y-4">
                <Field name="title">
                    {({ input }) => <TextField {...input} label="Title" />}
                </Field>
                <Field name="sku">
                    {({ input }) => <TextField {...input} label="SKU" />}
                </Field>
            </div>

            <Divider orientation="vertical" sx={{ marginX: 4 }} flexItem />

            <div className="flex-1 flex flex-col space-y-4">
                <Field name="category" type="select">
                    {({ input }) => (
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select label="Category" {...input}>
                                <MenuItem value="">None</MenuItem>
                                <Divider />
                            </Select>
                        </FormControl>
                    )}
                </Field>
                <Field name="brand" type="select">
                    {({ input }) => (
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select label="Category" {...input}>
                                <MenuItem value="">None</MenuItem>
                                <Divider />
                            </Select>
                        </FormControl>
                    )}
                </Field>
            </div>
        </div>
    );
};

export default SearchProducts;
