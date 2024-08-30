import { render } from "@testing-library/react";
import PreviewCard from "@/modules/DashboardModule/components/PreviewCard";

describe("PreviewCard", () => {
    it("renders with valid props", () => {
        const chartData = [
            { period: "2022-01-01", total: 100 },
            { period: "2022-01-02", total: 200 },
        ];
        const isLoading = false;
        const { getByText } = render(
            <PreviewCard chartData={chartData} isLoading={isLoading} />
        );
        expect(getByText("2022-01-01")).toBeInTheDocument();
        expect(getByText("100")).toBeInTheDocument();
    });

    it("renders with invalid props", () => {
        const chartData = undefined;
        const isLoading = false;
        const { getByText } = render(
            <PreviewCard chartData={chartData} isLoading={isLoading} />
        );
        expect(getByText("Error: chartData is required")).toBeInTheDocument();
    });

    it("renders Loading component when isLoading is true", () => {
        const chartData = [
            { period: "2022-01-01", total: 100 },
            { period: "2022-01-02", total: 200 },
        ];
        const isLoading = true;
        const { getByText } = render(
            <PreviewCard chartData={chartData} isLoading={isLoading} />
        );
        expect(getByText("Loading...")).toBeInTheDocument();
    });

    it("renders AreaChart component when isLoading is false", () => {
        const chartData = [
            { period: "2022-01-01", total: 100 },
            { period: "2022-01-02", total: 200 },
        ];
        const isLoading = false;
        const { getByText } = render(
            <PreviewCard chartData={chartData} isLoading={isLoading} />
        );
        expect(getByText("2022-01-01")).toBeInTheDocument();
        expect(getByText("100")).toBeInTheDocument();
    });

    it("renders CustomTooltip component", () => {
        const chartData = [
            { period: "2022-01-01", total: 100 },
            { period: "2022-01-02", total: 200 },
        ];
        const isLoading = false;
        const { getByText } = render(
            <PreviewCard chartData={chartData} isLoading={isLoading} />
        );
        const tooltip = getByText("Date: 2022-01-01");
        expect(tooltip).toBeInTheDocument();
    });
});
