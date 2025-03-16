import { useDrawingArea } from "@mui/x-charts";

const ColorSwitch = ({
    colorId,
    color,
}: {
    colorId: string;
    color: string;
}) => {
    const { top, height, bottom } = useDrawingArea();
    const svgHeight = top + bottom + height;

    return (
        <defs>
            <linearGradient
                id={colorId}
                x1="0"
                y1="0"
                x2="0"
                y2={`${svgHeight}px`}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor={color} stopOpacity="0.3" />
                <stop offset="1" stopColor={color} stopOpacity="0" />
            </linearGradient>
        </defs>
    );
};

export default ColorSwitch;
