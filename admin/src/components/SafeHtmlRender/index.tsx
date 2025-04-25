import DOMPurify from "dompurify";
import "./styles.css";

interface SafeHtmlRenderProps {
    htmlContent: string;
}

const SafeHtmlRender = ({ htmlContent }: SafeHtmlRenderProps) => {
    const sanitizedHtml = DOMPurify.sanitize(htmlContent);

    return (
        <div
            className="SafeHtmlRender"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
    );
};

export default SafeHtmlRender;
