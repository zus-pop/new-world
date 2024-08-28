import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import "./App.css";

// layout
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";

// pages
import Home from "./pages/Home/Home";
import Error from "./pages/Error/Error";
import ProductTable from "./pages/Dashboard/ProductTable/ProductTable";
import CategoryTable from "./pages/Dashboard/CategoryTable/CategoryTable";
import { createContext } from "react";

export const BaseUrlContext = createContext("http://localhost:3000/api/v1");

const queryClient = new QueryClient();
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<RootLayout></RootLayout>}
            errorElement={<Error />}
        >
            <Route index element={<Home></Home>}></Route>
            <Route path="dashboard" element={<DashboardLayout />}>
                <Route path="product" element={<ProductTable />} />
                <Route path="category" element={<CategoryTable />} />
            </Route>
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
