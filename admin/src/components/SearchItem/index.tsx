import { Field } from "react-final-form";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Close, Search } from "@mui/icons-material";

interface SearchItemProps {
    placeholder?: string;
}

const SearchItem = ({ placeholder }: SearchItemProps) => {
    return (
        <Field name="search">
            {({ input }) => (
                <TextField
                    {...input}
                    placeholder={placeholder ? placeholder : "Search"}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                            endAdornment: input.value && (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => {
                                            input.onChange("");
                                        }}
                                    >
                                        <Close />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                    fullWidth
                />
            )}
        </Field>
    );
};

export default SearchItem;
