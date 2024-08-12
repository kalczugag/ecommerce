import { FormApi } from "final-form";
import { Field } from "react-final-form";
import { FormControl, InputLabel, Menu, MenuItem, Select } from "@mui/material";

export interface SortFormProps {
    displayLabels: string[];
    fields: {
        for: string;
        items: {
            label: string;
            value: string;
        }[];
    }[];
    form?: FormApi<any, Partial<any>>;
}

const SortForm = ({ displayLabels, fields, form }: SortFormProps) => {
    return (
        <>
            {displayLabels.map((label) => {
                const field = fields.find((item) => item.for === label);
                if (!field) {
                    return null;
                }

                return (
                    <Field name={label.toLowerCase()} type="select" key={label}>
                        {(props) => (
                            <FormControl fullWidth sx={{ maxWidth: "250px" }}>
                                <InputLabel>{label}</InputLabel>
                                <Select
                                    value={props.input.value}
                                    label={label}
                                    onChange={(event) => {
                                        props.input.onChange(
                                            event.target.value
                                        );
                                        if (form) form.submit();
                                    }}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    {field.items.map((el) => (
                                        <MenuItem
                                            key={el.value}
                                            value={el.value}
                                        >
                                            {el.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </Field>
                );
            })}
        </>
    );
};

export default SortForm;
