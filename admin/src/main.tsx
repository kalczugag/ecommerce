import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { store } from "@/store/index.ts";
import { ImageKitProvider } from "@imagekit/react";
import App from "@/App.tsx";
import "@/index.css";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ImageKitProvider
                    urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
                >
                    <SnackbarProvider autoHideDuration={2000} preventDuplicate>
                        <App />
                    </SnackbarProvider>
                </ImageKitProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
