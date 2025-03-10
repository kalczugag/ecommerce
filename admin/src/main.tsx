import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { store } from "@/store/index.ts";
import App from "@/App.tsx";
import "@/index.css";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <SnackbarProvider autoHideDuration={2000} preventDuplicate>
                    <App />
                </SnackbarProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
