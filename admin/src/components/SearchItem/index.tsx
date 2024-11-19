import { Form, Field } from "react-final-form";
import { InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchItemProps {
    placeholder?: string;
    handleSubmit: (searchTerm: string) => void;
}

const SearchItem = ({ placeholder, handleSubmit }: SearchItemProps) => {
    return (
        <Form
            onSubmit={handleSubmit}
            render={({ handleSubmit, form }) => (
                <form onSubmit={handleSubmit} className="text-end">
                    <Field name="search">
                        {(props) => (
                            <TextField
                                {...props.input}
                                placeholder={
                                    placeholder ? placeholder : "Search"
                                }
                                sx={{ minWidth: "300px" }}
                                variant="standard"
                                onChange={(e) => {
                                    props.input.onChange(e);
                                    form.submit();
                                }}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        )}
                    </Field>
                </form>
            )}
        />
    );
};

export default SearchItem;
