import { Field, Form } from "react-final-form";
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
    handleSubmit: (values: any) => void;
}

const SelectField = ({
    label,
    items,
    value,
    onChange,
    onSubmit,
}: SelectFieldProps) => (
    <FormControl fullWidth className="truncate">
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

const SortForm = ({ config, handleSubmit }: SortFormProps) => {
    return (
        <Form
            onSubmit={handleSubmit}
            render={({ handleSubmit, form }) => (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row"
                >
                    {config.map(({ label, items }) => {
                        return (
                            <Field
                                name={label.toLowerCase()}
                                type="select"
                                key={label}
                            >
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
                </form>
            )}
        />
    );
};

export default SortForm;
