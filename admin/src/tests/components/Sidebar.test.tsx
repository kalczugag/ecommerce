import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import type { SidebarContent } from "@/types/Content";

describe("Sidebar", () => {
    const content: SidebarContent[] = [
        {
            label: "Dashboard",
            to: "/dashboard",
            icon: <div>Dashboard Icon</div>,
        },
        { label: "Products", to: "/products", icon: <div>Products Icon</div> },
    ];

    it("renders the correct number of sidebar items", () => {
        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <Sidebar content={content} />
            </MemoryRouter>
        );
        expect(screen.getAllByTestId("sidebar-item")).toHaveLength(2);
    });

    it("renders the correct label for each sidebar item", () => {
        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <Sidebar content={content} />
            </MemoryRouter>
        );
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Products")).toBeInTheDocument();
    });

    it("renders the correct icon for each sidebar item", () => {
        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <Sidebar content={content} />
            </MemoryRouter>
        );
        expect(screen.getByText("Dashboard Icon")).toBeInTheDocument();
        expect(screen.getByText("Products Icon")).toBeInTheDocument();
    });

    it("marks the active item as active", () => {
        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <Sidebar content={content} />
            </MemoryRouter>
        );
        expect(screen.getByText("Dashboard").parentElement).toHaveClass(
            "bg-lighter dark:bg-dark-primary hover:bg-gray-200 dark:hover:bg-hover-dark"
        );
    });
});
