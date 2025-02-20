import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { store } from "./store";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
<<<<<<< HEAD
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <SnackbarProvider
                    autoHideDuration={2000}
                    preventDuplicate
                    className="print:hidden"
                >
                    <App />
                </SnackbarProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </Provider>
=======
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <SnackbarProvider
                        autoHideDuration={2000}
                        preventDuplicate
                        className="print:hidden"
                    >
                        <App />
                    </SnackbarProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>
>>>>>>> 1b915f4c07fe0c82d041b96dee8fd35c99c2c148
);
