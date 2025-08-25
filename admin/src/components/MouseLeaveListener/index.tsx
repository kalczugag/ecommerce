import { ReactNode, useRef } from "react";

interface MouseLeaveListenerProps {
    onMouseLeave: () => void;
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const MouseLeaveListener = ({
    onMouseLeave,
    children,
    className,
    style,
}: MouseLeaveListenerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseLeave = (e: React.MouseEvent) => {
        const toElement = e.relatedTarget as HTMLElement | null;
        if (toElement && containerRef.current?.contains(toElement)) return;
        onMouseLeave();
    };

    return (
        <div
            ref={containerRef}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={style}
        >
            {children}
        </div>
    );
};

export default MouseLeaveListener;
