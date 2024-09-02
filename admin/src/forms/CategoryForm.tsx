import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { Field, FieldInputProps } from "react-final-form";
import { useGetCategoriesByLevelQuery } from "@/store";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Tooltip,
} from "@mui/material";
import Row from "@/components/Row";
import { CategoryLevel } from "@/types/Category";

interface CategoryFormProps {
    isLoading: boolean;
    hasChildren?: boolean;
    level?: CategoryLevel;
    isUpdateForm?: boolean;
}

const CategoryForm = ({
    isLoading,
    hasChildren,
    level,
    isUpdateForm,
}: CategoryFormProps) => {
    const levelToFetch =
        level === "topLevel"
            ? null
            : level === "secondLevel"
            ? "topLevel"
            : level === "thirdLevel"
            ? "secondLevel"
            : null;

    const { data, isSuccess } = useGetCategoriesByLevelQuery(
        levelToFetch || skipToken
    );

    const [parentBlock, setParentBlock] = useState(false);

    const handleLevelChange = (
        e: SelectChangeEvent<any>,
        input: FieldInputProps<any, HTMLElement>
    ) => {
        const selectedLevel = e.target.value as CategoryLevel;

        if (selectedLevel === "topLevel") {
            setParentBlock(true);
        } else {
            setParentBlock(false);
        }

        input.onChange(e);
    };

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
                        <FormControl
                            disabled={
                                isUpdateForm
                                    ? !isSuccess || parentBlock
                                    : false || parentBlock
                            }
                            fullWidth
                        >
                            <InputLabel>
                                {isUpdateForm
                                    ? !isSuccess || parentBlock
                                        ? "Cannot set parent"
                                        : "Parent"
                                    : "Parent"}
                            </InputLabel>
                            <Select
                                defaultValue=""
                                value={parentBlock ? "" : props.input.value}
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
                        <Tooltip
                            title={
                                hasChildren
                                    ? "Cannot set level because this category has childrens"
                                    : ""
                            }
                            placement="bottom"
                        >
                            <FormControl
                                disabled={isUpdateForm ? !isSuccess : false}
                                fullWidth
                            >
                                <InputLabel>Level</InputLabel>
                                <Select
                                    value={props.input.value}
                                    label="Level"
                                    defaultValue="thirdLevel"
                                    onChange={(e) =>
                                        handleLevelChange(e, props.input)
                                    }
                                    error={
                                        props.meta.error && props.meta.touched
                                    }
                                >
                                    <MenuItem value="topLevel">
                                        Top Level
                                    </MenuItem>
                                    <MenuItem value="secondLevel">
                                        Second Level
                                    </MenuItem>
                                    <MenuItem value="thirdLevel">
                                        Third Level
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Tooltip>
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
