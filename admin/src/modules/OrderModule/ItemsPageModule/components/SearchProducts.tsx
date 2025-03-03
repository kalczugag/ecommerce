import { useLazyGetAllCategoriesQuery } from "@/store";
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
    const [triggerFetch, { data, isLoading }] = useLazyGetAllCategoriesQuery();

    const handleOpen = () => {
        if (!data?.result) triggerFetch({ named: true });
    };

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
                <Field name="brand">
                    {({ input }) => <TextField {...input} label="Brand" />}
                </Field>
                <Field name="category" type="select">
                    {({ input }) => (
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                {...input}
                                label="Category"
                                onOpen={handleOpen}
                            >
                                {isLoading ? (
                                    <MenuItem disabled>Loading...</MenuItem>
                                ) : (
                                    <div>
                                        <MenuItem value="">None</MenuItem>
                                        <Divider />
                                        {data?.result.map((item) => {
                                            if (item.level === "thirdLevel")
                                                return;

                                            return (
                                                <MenuItem
                                                    key={item._id}
                                                    value={item._id}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </div>
                                )}
                            </Select>
                        </FormControl>
                    )}
                </Field>
            </div>
        </div>
    );
};

export default SearchProducts;
