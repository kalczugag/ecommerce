import { render } from "@testing-library/react";
import SummaryCard from "@/modules/DashboardModule/components/SummaryCard";

describe("SummaryCard", () => {
    it("renders with default props", () => {
        const { getByText } = render(<SummaryCard />);
        expect(getByText("")).toBeInTheDocument();
        expect(getByText("0")).toBeInTheDocument();
        expect(getByText("N/A")).toBeInTheDocument();
    });

    it("renders with custom props", () => {
        const props = {
            title: "Custom Title",
            value: 100,
            icon: <div>Custom Icon</div>,
            summary: 10,
            isLoading: false,
        };
        const { getByText } = render(<SummaryCard {...props} />);
        expect(getByText("Custom Title")).toBeInTheDocument();
        expect(getByText("100")).toBeInTheDocument();
        expect(getByText("10% Since Last week")).toBeInTheDocument();
    });

    it("displays correct summary text when summary is positive", () => {
        const props = {
            summary: 10,
        };
        const { getByText } = render(<SummaryCard {...props} />);
        expect(getByText("10% Since Last week")).toBeInTheDocument();
        expect(getByText("10%")).toHaveClass("text-green-500");
    });

    it("displays correct summary text when summary is negative", () => {
        const props = {
            summary: -10,
        };
        const { getByText } = render(<SummaryCard {...props} />);
        expect(getByText("-10% Since Last week")).toBeInTheDocument();
        expect(getByText("-10%")).toHaveClass("text-red-500");
    });

    it('displays "N/A" when summary is 0', () => {
        const props = {
            summary: 0,
        };
        const { getByText } = render(<SummaryCard {...props} />);
        expect(getByText("N/A")).toBeInTheDocument();
    });

    it("renders the loading state correctly", () => {
        const props = {
            isLoading: true,
        };
        const { getByText } = render(<SummaryCard {...props} />);
        expect(getByText("Loading...")).toBeInTheDocument();
    });
});
