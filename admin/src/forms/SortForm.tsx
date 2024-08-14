import { Field } from "react-final-form";
import { FormApi } from "final-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface SelectItem {
    label: string;
    value: string;
}

export interface ConfigType {
    label: string;
    items: SelectItem[];
}

interface SelectFieldProps {
    label: string;
    items: SelectItem[];
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

export interface SortFormProps {
    config: ConfigType[];
    form: FormApi<any, Partial<any>>;
}

const SelectField = ({
    label,
    items,
    value,
    onChange,
    onSubmit,
}: SelectFieldProps) => (
    <FormControl fullWidth sx={{ maxWidth: "250px" }}>
        <InputLabel>{label}</InputLabel>
        <Select
            value={value}
            label={label}
            onChange={(event) => {
                const newValue = event.target.value as string;
                onChange(newValue);
                if (onSubmit) onSubmit();
            }}
        >
            <MenuItem value="">None</MenuItem>
            {items.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                    {label}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

const SortForm = ({ config, form }: SortFormProps) => {
    return (
        <>
            {config.map(({ label, items }) => {
                return (
                    <Field name={label.toLowerCase()} type="select" key={label}>
                        {(props) => (
                            <SelectField
                                label={label}
                                items={items}
                                value={props.input.value}
                                onChange={props.input.onChange}
                                onSubmit={() => form?.submit()}
                            />
                        )}
                    </Field>
                );
            })}
        </>
    );
};

export default SortForm;
