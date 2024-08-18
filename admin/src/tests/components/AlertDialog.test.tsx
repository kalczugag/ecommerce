import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AlertDialog from "@/components/AlertDialog";

describe("AlertDialog Component", () => {
    test("renders children and passes open function", () => {
        const mockChild = vi.fn();

        render(
            <AlertDialog
                title="Test Title"
                content="Test Content"
                confirm="Confirm"
                cancel="Cancel"
                onConfirm={vi.fn()}
            >
                {mockChild}
            </AlertDialog>
        );

        expect(mockChild).toHaveBeenCalledWith(
            expect.objectContaining({ open: expect.any(Function) })
        );
    });

    test("opens the dialog when the open function is called", () => {
        render(
            <AlertDialog
                title="Test Title"
                content="Test Content"
                confirm="Confirm"
                cancel="Cancel"
                onConfirm={vi.fn()}
            >
                {({ open }) => <button onClick={open}>Open Dialog</button>}
            </AlertDialog>
        );

        expect(screen.queryByText("Test Title")).not.toBeInTheDocument();

        fireEvent.click(screen.getByText("Open Dialog"));

        expect(screen.getByText("Test Title")).toBeInTheDocument();
    });

    test("calls onConfirm and closes dialog when confirm is clicked", async () => {
        const onConfirmMock = vi.fn();

        render(
            <AlertDialog
                title="Test Title"
                content="Test Content"
                confirm="Confirm"
                cancel="Cancel"
                onConfirm={onConfirmMock}
            >
                {({ open }) => <button onClick={open}>Open Dialog</button>}
            </AlertDialog>
        );

        fireEvent.click(screen.getByText("Open Dialog"));

        expect(screen.getByText("Test Title")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Confirm"));

        expect(onConfirmMock).toHaveBeenCalled();

        await waitFor(() => {
            expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
        });
    });

    test("closes the dialog when cancel is clicked", async () => {
        render(
            <AlertDialog
                title="Test Title"
                content="Test Content"
                confirm="Confirm"
                cancel="Cancel"
                onConfirm={vi.fn()}
            >
                {({ open }) => <button onClick={open}>Open Dialog</button>}
            </AlertDialog>
        );

        fireEvent.click(screen.getByText("Open Dialog"));

        expect(screen.getByText("Test Title")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Cancel"));

        await waitFor(() => {
            expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
        });
    });
});
