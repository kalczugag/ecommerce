import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import App from "./App.tsx";
import "./index.css";
import { SnackbarProvider } from "notistack";

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
