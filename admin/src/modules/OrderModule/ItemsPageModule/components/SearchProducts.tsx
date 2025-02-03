import {
    Divider,
    FormControl,
    FormLabel,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { Field, Form } from "react-final-form";

const config = [
    {
        key: "title",
        label: "Name",
    },
    {
        key: "category",
        label: "Category",
    },
    {
        key: "id",
        label: "ID",
    },
    {
        key: "brand",
        label: "Brand",
    },
];

const SearchProducts = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div className="flex flex-col space-y-4">
            <Form
                onSubmit={handleSubmit}
                render={({ handleSubmit }) => (
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-2 gap-4"
                    >
                        {config.map(({ key, label }) => (
                            <Field name={key} type="select">
                                {({ input }) => (
                                    <FormControl fullWidth>
                                        <InputLabel>{label}</InputLabel>
                                        <Select label={label} {...input}>
                                            <MenuItem value="">None</MenuItem>
                                            <Divider />
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            </Field>
                        ))}
                    </form>
                )}
            />
        </div>
    );
};

export default SearchProducts;
