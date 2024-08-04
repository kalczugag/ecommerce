import { render } from "@testing-library/react";
import TabsContent from "@/components/TabsContent";
import type { Content } from "@/types/Content";

describe("TabsContent", () => {
    it("returns an empty array when content is empty", () => {
        const content: Content[] = [];
        const { container } = render(<TabsContent content={content} />);
        expect(container.firstChild).toBeNull();
    });

    it("returns a single SettingsLayout component when content contains one item", () => {
        const content: Content[] = [
            {
                key: "1",
                label: "Tab 1",
                children: <div>Tab 1 content</div>,
            },
        ];
        const { getByText } = render(<TabsContent content={content} />);
        expect(getByText("Tab 1")).toBeInTheDocument();
    });

    it("returns a list of SettingsLayout components when content contains multiple items", () => {
        const content: Content[] = [
            {
                key: "1",
                label: "Tab 1",
                children: <div>Tab 1 content</div>,
            },
            {
                key: "2",
                label: "Tab 2",
                children: <div>Tab 2 content</div>,
            },
        ];
        const { getByText } = render(<TabsContent content={content} />);
        expect(getByText("Tab 1")).toBeInTheDocument();
        expect(getByText("Tab 2")).toBeInTheDocument();
    });
});
