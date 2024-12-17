import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { store } from "./store";
import App from "./App.tsx";
import "./index.css";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <SnackbarProvider
                    autoHideDuration={2000}
                    preventDuplicate
                    className="print:hidden"
                >
                    <App />
                </SnackbarProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
