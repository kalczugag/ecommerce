import { TaskAltOutlined, ErrorOutlineOutlined } from "@mui/icons-material";

interface MessageBoxProps {
    title: string;
    message: string;
    variant?: "success" | "error";
}

const MessageBox = ({
    title,
    message,
    variant = "success",
}: MessageBoxProps) => {
    return (
        <div
            className={`flex flex-row space-x-2 ${
                variant === "success" ? "bg-green-700" : "bg-red-700"
            } text-white my-4 p-4 rounded max-w-sm`}
        >
            {variant === "success" ? (
                <TaskAltOutlined />
            ) : (
                <ErrorOutlineOutlined />
            )}
            <div className="flex flex-col space-y-1">
                <h3 className="font-bold">{title}</h3>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default MessageBox;
