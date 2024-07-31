import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TitledIconButton from "../../components/TitledIconButton";

describe("TitledIconButton", () => {
    it("renders the title and icon", () => {
        render(
            <MemoryRouter>
                <TitledIconButton
                    title="Test Button"
                    to="/test"
                    icon={<span>Icon</span>}
                />
            </MemoryRouter>
        );
        expect(screen.getByText("Test Button")).toBeInTheDocument();
        expect(screen.getByText("Icon")).toBeInTheDocument();
    });

    it("calls the handleClick function when clicked", () => {
        const handleClick = vi.fn();
        render(
            <MemoryRouter>
                <TitledIconButton
                    title="Test Button"
                    to="/test"
                    handleClick={handleClick}
                />
            </MemoryRouter>
        );
        const button = screen.getByRole("link");
        button.click();
        expect(handleClick).toHaveBeenCalled();
    });

    it("does not render the icon if it is not provided", () => {
        render(
            <MemoryRouter>
                <TitledIconButton title="Test Button" to="/test" />
            </MemoryRouter>
        );
        expect(screen.queryByText("Icon")).toBeNull();
    });
});
