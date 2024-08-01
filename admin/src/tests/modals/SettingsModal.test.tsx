import { render, screen, fireEvent, renderHook } from "@testing-library/react";
import SettingsModal from "../../containers/modals/SettingsModal";
import useTheme from "../../hooks/useTheme";

vi.mock("../../hooks/useTheme", () => ({
    __esModule: true,
    default: () => ({
        mode: "light",
        toggleTheme: vi.fn(),
    }),
}));

describe("SettingsModal", () => {
    it("renders the component correctly", () => {
        render(<SettingsModal />);

        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("opens and closes the modal on button click", () => {
        render(<SettingsModal />);

        expect(screen.queryByText("Text in a modal")).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole("button"));

        expect(screen.getByText("Text in a modal")).toBeInTheDocument();

        fireEvent.click(screen.getByTestId("closeButton"));

        expect(screen.queryByText("Text in a modal")).not.toBeInTheDocument();
    });

    it("contains the correct modal content", async () => {
        render(<SettingsModal />);

        fireEvent.click(screen.getByRole("button"));

        expect(screen.getByText("Text in a modal")).toBeInTheDocument();

        expect(screen.getByLabelText("Dark Mode")).toBeInTheDocument();
    });

    it("toggles the theme on switch change", () => {
        const { result } = renderHook(() => useTheme());
        const { toggleTheme } = result.current;

        vi.spyOn(result.current, "toggleTheme");

        render(<SettingsModal />);

        fireEvent.click(screen.getByRole("button"));

        fireEvent.click(screen.getByLabelText("Dark Mode"));

        expect(toggleTheme).toHaveBeenCalled();
    });
});
