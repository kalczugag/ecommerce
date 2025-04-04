import { Form, Field } from "react-final-form";
import { IconButton, InputAdornment, InputBase, Paper } from "@mui/material";
import { Close, Search } from "@mui/icons-material";

interface SearchItemProps {
    placeholder?: string;
    endAdornment?: JSX.Element;
    handleOpen: () => void;
    handleSubmit: (value: { searchTerm: string }) => void;
}

const SearchItem = ({
    placeholder,
    endAdornment,
    handleOpen,
    handleSubmit,
}: SearchItemProps) => {
    return (
        <Form
            onSubmit={handleSubmit}
            render={({ handleSubmit, form }) => (
                <form onSubmit={handleSubmit} className="text-end z-50">
                    <Field name="searchTerm">
                        {({ input }) => (
                            <Paper
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    p: "2px 4px",
                                    mx: 2,
                                }}
                                elevation={0}
                                variant="outlined"
                            >
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                                <InputBase
                                    {...input}
                                    sx={{ flex: 1, ml: 1 }}
                                    onFocus={handleOpen}
                                    placeholder={placeholder || "Search"}
                                    fullWidth
                                />
                                {input.value.length > 0 && (
                                    <IconButton
                                        onClick={() => form.reset()}
                                        size="small"
                                    >
                                        <Close />
                                    </IconButton>
                                )}
                            </Paper>
                        )}
                    </Field>
                </form>
            )}
        />
    );
};

export default SearchItem;
