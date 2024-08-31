import { skipToken } from "@reduxjs/toolkit/query";
import { Field } from "react-final-form";
import { useGetCategoriesByLevelQuery } from "@/store";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import Row from "@/components/Row";
import { CategoryLevel } from "@/types/Category";

interface CategoryFormProps {
    isLoading: boolean;
    level?: CategoryLevel;
}

const CategoryForm = ({ isLoading, level }: CategoryFormProps) => {
    const levelToFetch =
        level === "topLevel"
            ? ""
            : level === "secondLevel"
            ? "topLevel"
            : "secondLevel";

    const { data, isSuccess } = useGetCategoriesByLevelQuery(
        levelToFetch || skipToken
    );

    return (
        <div className="flex flex-col space-y-4">
            <Row>
                <Field name="name">
                    {(props) => (
                        <TextField
                            label="Name"
                            name={props.input.name}
                            value={props.input.value}
                            onChange={props.input.onChange}
                            error={props.meta.error && props.meta.touched}
                            helperText={
                                props.meta.error && props.meta.touched
                                    ? props.meta.error
                                    : null
                            }
                            disabled={isLoading}
                            fullWidth
                        />
                    )}
                </Field>
                <Field name="parentCategory._id" type="select">
                    {(props) => (
                        <FormControl disabled={!isSuccess} fullWidth>
                            <InputLabel>
                                {!isSuccess ? "Cannot set parent" : "Parent"}
                            </InputLabel>
                            <Select
                                value={props.input.value}
                                label="Parent"
                                onChange={props.input.onChange}
                                error={props.meta.error && props.meta.touched}
                            >
                                <MenuItem value="">None</MenuItem>
                                {isSuccess &&
                                    data.map(({ name, _id }, index) => (
                                        <MenuItem key={index} value={_id}>
                                            {name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    )}
                </Field>
            </Row>
            <Field name="description" type="textarea">
                {(props) => (
                    <TextField
                        label="Description"
                        name={props.input.name}
                        value={props.input.value}
                        onChange={props.input.onChange}
                        error={props.meta.error && props.meta.touched}
                        helperText={
                            props.meta.error && props.meta.touched
                                ? props.meta.error
                                : null
                        }
                        disabled={isLoading}
                        multiline
                        fullWidth
                    />
                )}
            </Field>
            <Row>
                <Field name="level" type="select">
                    {(props) => (
                        <FormControl disabled={!isSuccess} fullWidth>
                            <InputLabel>Level</InputLabel>
                            <Select
                                value={props.input.value}
                                label="Level"
                                onChange={props.input.onChange}
                                error={props.meta.error && props.meta.touched}
                            >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value={"topLevel"}>
                                    Top Level
                                </MenuItem>
                                <MenuItem value={"secondLevel"}>
                                    Second Level
                                </MenuItem>
                                <MenuItem value={"thirdLevel"}>
                                    Third Level
                                </MenuItem>
                            </Select>
                        </FormControl>
                    )}
                </Field>
                <div className="w-full text-center">
                    <p>placeholder #1</p>
                    <p>placeholder #1</p>
                </div>
            </Row>
        </div>
    );
};

export default CategoryForm;
