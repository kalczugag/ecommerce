import { render } from "@testing-library/react";
import SummaryCard from "@/modules/DashboardModule/components/SummaryCard";

describe("SummaryCard component", () => {
    it("renders title correctly", () => {
        const title = "Test Title";
        const { getByText } = render(
            <SummaryCard title={title} value={0} icon={<div />} summary={0} />
        );
        expect(getByText(title)).toBeInTheDocument();
    });

    it("renders value correctly", () => {
        const value = 100;
        const { getByText } = render(
            <SummaryCard
                title="Test Title"
                value={value}
                icon={<div />}
                summary={0}
            />
        );
        expect(getByText(value.toString())).toBeInTheDocument();
    });

    it("renders icon correctly", () => {
        const icon = <div>Test Icon</div>;
        const { getByText } = render(
            <SummaryCard title="Test Title" value={0} icon={icon} summary={0} />
        );
        expect(getByText("Test Icon")).toBeInTheDocument();
    });

    it("renders summary with positive value correctly", () => {
        const summary = 10;
        const { getByText } = render(
            <SummaryCard
                title="Test Title"
                value={0}
                icon={<div />}
                summary={summary}
            />
        );
        expect(getByText(`${summary}%`)).toHaveClass("text-green-500");
    });

    it("renders summary with negative value correctly", () => {
        const summary = -10;
        const { getByText } = render(
            <SummaryCard
                title="Test Title"
                value={0}
                icon={<div />}
                summary={summary}
            />
        );
        expect(getByText(`${summary}%`)).toHaveClass("text-red-500");
    });

    it("renders summary with zero value correctly", () => {
        const summary = 0;
        const { getByText } = render(
            <SummaryCard
                title="Test Title"
                value={0}
                icon={<div />}
                summary={summary}
            />
        );
        expect(getByText(`${summary}%`)).toHaveClass("font-bold");
    });
});
