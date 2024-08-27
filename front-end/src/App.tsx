import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import "./App.css";

// pages
import Home from "./pages/Home/Home";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Error from "./pages/Error/Error";

const queryClient = new QueryClient();
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<RootLayout></RootLayout>}
            errorElement={<Error />}
        >
            <Route index element={<Home></Home>}></Route>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
    )
);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
    );
}

export default App;
