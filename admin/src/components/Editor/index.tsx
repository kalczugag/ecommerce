import { Box, useTheme } from "@mui/material";
import { useMemo } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";

interface EditorProps extends Omit<ReactQuillProps, "value" | "onChange"> {
    fullWidth?: boolean;
    input?: {
        value: string;
        onChange: (value: string) => void;
        onBlur: () => void;
        onFocus: () => void;
        name: string;
    };
    meta?: {
        error?: string;
        touched?: boolean;
        active?: boolean;
        dirty?: boolean;
        invalid?: boolean;
    };
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
}

const Editor = ({
    fullWidth = true,
    input,
    meta,
    value,
    onChange,
    onBlur,
    onFocus,
    ...props
}: EditorProps) => {
    const theme = useTheme();

    const quillModules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ color: [] }, { background: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ indent: "-1" }, { indent: "+1" }],
                    ["link", "image"],
                    ["clean"],
                ],
            },
            clipboard: {
                matchVisual: false,
            },
        }),
        []
    );

    const quillFormats = useMemo(
        () => [
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "color",
            "background",
            "list",
            "bullet",
            "indent",
            "link",
            "image",
        ],
        []
    );

    const quillStyles = useMemo(
        () => ({
            width: fullWidth ? "100%" : "auto",
            "& .ql-toolbar": {
                borderTop: `1px solid ${theme.palette.divider}`,
                borderLeft: `1px solid ${theme.palette.divider}`,
                borderRight: `1px solid ${theme.palette.divider}`,
                borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
            },
            "& .ql-toolbar .ql-stroke": {
                stroke: theme.palette.text.primary,
            },
            "& .ql-toolbar .ql-fill": {
                fill: theme.palette.text.primary,
            },
            "& .ql-toolbar .ql-picker-label": {
                color: theme.palette.text.primary,
            },
            "& .ql-toolbar .ql-picker-options": {
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
            },
            "& .ql-container": {
                borderBottom: `1px solid ${theme.palette.divider}`,
                borderLeft: `1px solid ${theme.palette.divider}`,
                borderRight: `1px solid ${theme.palette.divider}`,
                borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
                backgroundColor: theme.palette.background.paper,
                ...(meta?.error &&
                    meta?.touched && {
                        borderBottomColor: theme.palette.error.main,
                        borderLeftColor: theme.palette.error.main,
                        borderRightColor: theme.palette.error.main,
                    }),
            },
            "& .ql-editor": {
                minHeight: "200px",
                fontFamily: theme.typography.body1.fontFamily,
                fontSize: theme.typography.body1.fontSize,
                color: theme.palette.text.primary,
                "&.ql-blank::before": {
                    fontStyle: "italic",
                    color: theme.palette.text.secondary,
                },
            },
            "& .ql-editor p, & .ql-editor div, & .ql-editor span": {
                color: theme.palette.text.primary,
            },
            "& .ql-picker.ql-expanded .ql-picker-label": {
                color: theme.palette.text.primary,
            },
            "& .ql-picker.ql-expanded .ql-picker-options": {
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
            },
            "& .ql-picker-item": {
                color: theme.palette.text.primary,
                "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                },
            },
        }),
        [theme, fullWidth, meta?.error, meta?.touched]
    );

    const editorValue = input?.value ?? value ?? "";
    const handleChange = input?.onChange ?? onChange;
    const handleBlur = input?.onBlur ?? onBlur;
    const handleFocus = input?.onFocus ?? onFocus;

    return (
        <Box sx={quillStyles}>
            <ReactQuill
                theme="snow"
                modules={quillModules}
                formats={quillFormats}
                placeholder="Enter campaign description..."
                value={editorValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                {...props}
            />
            {meta?.error && meta?.touched && (
                <Box
                    sx={{
                        color: theme.palette.error.main,
                        fontSize: theme.typography.caption.fontSize,
                        marginTop: 1,
                        marginLeft: 2,
                    }}
                >
                    {meta.error}
                </Box>
            )}
        </Box>
    );
};

export default Editor;
