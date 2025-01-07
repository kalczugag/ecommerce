import { Field } from "react-final-form";
import {
    Box,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Theme,
    useTheme,
} from "@mui/material";
import Loading from "@/components/Loading";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(_id: string, selectedIds: string[], theme: Theme) {
    return {
        fontWeight: selectedIds.includes(_id)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

interface MultiSelectProps {
    name: string;
    data: {
        _id: string;
        label: string;
    }[];
    isLoading: boolean;
}

const MultiSelect = ({ name, data, isLoading }: MultiSelectProps) => {
    const theme = useTheme();

    return (
        <Loading isLoading={isLoading}>
            <Field name={name}>
                {({ input }) => (
                    <FormControl sx={{ width: 300 }}>
                        <InputLabel>Chip</InputLabel>
                        <Select
                            multiple
                            value={input.value || []}
                            onChange={(event) => {
                                const {
                                    target: { value },
                                } = event;
                                input.onChange(value);
                            }}
                            input={<OutlinedInput label="Chip" />}
                            renderValue={(selected: string[]) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 0.5,
                                    }}
                                >
                                    {selected.map((id) => {
                                        const item = data.find(
                                            (d) => d._id === id
                                        );
                                        return (
                                            <Chip
                                                key={id}
                                                label={item?.label || id}
                                            />
                                        );
                                    })}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {data.map(({ _id, label }) => (
                                <MenuItem
                                    key={_id}
                                    value={_id}
                                    style={getStyles(
                                        _id,
                                        input.value || [],
                                        theme
                                    )}
                                >
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </Field>
        </Loading>
    );
};

export default MultiSelect;
