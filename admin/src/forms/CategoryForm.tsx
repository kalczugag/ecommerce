import { useState, useEffect } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { Field, FieldInputProps } from "react-final-form";
import { useGetCategoriesByLevelQuery } from "@/store";
import { required } from "@/utils/validators";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Tooltip,
} from "@mui/material";
import ReactQuill from "react-quill";
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
    level: initialLevel,
    isUpdateForm,
}: CategoryFormProps) => {
    const [level, setLevel] = useState(initialLevel || null);
    const [levelToFetch, setLevelToFetch] = useState<CategoryLevel | null>(
        null
    );
    const [parentBlock, setParentBlock] = useState(false);

    useEffect(() => {
        if (!level) return;

        const fetchLevel =
            level === "topLevel"
                ? null
                : level === "secondLevel"
                ? "topLevel"
                : level === "thirdLevel"
                ? "secondLevel"
                : null;

        setLevelToFetch(fetchLevel);
    }, [level]);

    const { data, isSuccess } = useGetCategoriesByLevelQuery(
        levelToFetch || skipToken
    );

    const handleLevelChange = (
        e: SelectChangeEvent<any>,
        input: FieldInputProps<any, HTMLElement>
    ) => {
        const selectedLevel = e.target.value as CategoryLevel;
        setLevel(selectedLevel);

        if (selectedLevel === "topLevel") {
            setParentBlock(true);
        } else {
            setParentBlock(false);
        }

        input.onChange(e);
    };

    return (
        <div className="flex flex-col space-y-4 max-w-2xl">
            <Row>
                <Field name="name" validate={required}>
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
                <Field name="_parentCategory" type="select">
                    {(props) => (
                        <FormControl
                            disabled={
                                !level ||
                                (isUpdateForm
                                    ? !isSuccess || parentBlock
                                    : parentBlock)
                            }
                            fullWidth
                        >
                            <InputLabel>
                                {!level
                                    ? "Set level to show parent categories"
                                    : isUpdateForm &&
                                      (!isSuccess || parentBlock)
                                    ? "Cannot set parent"
                                    : "Parent"}
                            </InputLabel>
                            <Select
                                defaultValue=""
                                value={
                                    parentBlock || !level
                                        ? ""
                                        : props.input.value
                                }
                                label={
                                    !level
                                        ? "Set level to show parent categories"
                                        : "Parent"
                                }
                                onChange={props.input.onChange}
                                error={props.meta.error && props.meta.touched}
                            >
                                <MenuItem value="">None</MenuItem>
                                {isSuccess &&
                                    data.result.map(({ name, _id }, index) => (
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
                    <ReactQuill {...props.input} />
                    // <TextField
                    //     label="Description"
                    //     name={props.input.name}
                    //     value={props.input.value}
                    //     onChange={props.input.onChange}
                    //     error={props.meta.error && props.meta.touched}
                    //     helperText={
                    //         props.meta.error && props.meta.touched
                    //             ? props.meta.error
                    //             : null
                    //     }
                    //     disabled={isLoading}
                    //     multiline
                    //     fullWidth
                    // />
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
                <div className="flex justify-center items-center w-full">
                    <p>{!hasChildren && "This category has no children"}</p>
                </div>
            </Row>
        </div>
    );
};

export default CategoryForm;
