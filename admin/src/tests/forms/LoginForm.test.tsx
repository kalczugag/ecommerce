import { render, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "@/forms/LoginForm";
import { Provider } from "react-redux";
import { store } from "@/store";

const TestProvider = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
);

describe("LoginForm", () => {
    it("renders with default props", () => {
        const { getByLabelText } = render(
            <TestProvider>
                <LoginForm />
            </TestProvider>
        );
        expect(getByLabelText("Email")).toBeInTheDocument();
        expect(getByLabelText("Password")).toBeInTheDocument();
    });

    it("renders with isLoading prop", () => {
        const { getByLabelText } = render(
            <TestProvider>
                <LoginForm isLoading />
            </TestProvider>
        );
        expect(getByLabelText("Email")).toBeDisabled();
        expect(getByLabelText("Password")).toBeDisabled();
    });

    it("toggles password visibility", () => {
        const { getByLabelText, getByRole } = render(
            <TestProvider>
                <LoginForm />
            </TestProvider>
        );
        const passwordInput = getByLabelText("Password") as HTMLInputElement;
        const toggleButton = getByRole("button", {
            name: /toggle password visibility/i,
        });

        expect(passwordInput.type).toBe("password");
        fireEvent.click(toggleButton);
        expect(passwordInput.type).toBe("text");
        fireEvent.click(toggleButton);
        expect(passwordInput.type).toBe("password");
    });

    it("validates email field", async () => {
        const { getByLabelText, getByText } = render(
            <TestProvider>
                <LoginForm />
            </TestProvider>
        );
        const emailInput = getByLabelText("Email") as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: "invalid-email" } });

        await waitFor(() => {
            expect(getByText("Invalid email")).toBeInTheDocument();
        });
    });

    it("validates password field", async () => {
        const { getByLabelText, getByText } = render(
            <TestProvider>
                <LoginForm />
            </TestProvider>
        );
        const passwordInput = getByLabelText("Password") as HTMLInputElement;
        fireEvent.change(passwordInput, { target: { value: "" } });

        await waitFor(() => {
            expect(getByText("Required")).toBeInTheDocument();
        });
    });
});
