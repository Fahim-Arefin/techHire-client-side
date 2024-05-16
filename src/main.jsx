import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import DashboardLayout from "./layouts/DashboardLayout";
import Category from "./pages/Category";
import HireTechnician from "./pages/HireTechnician";
import MyCategories from "./pages/MyCategories";
import RequestService from "./pages/RequestService";
import ServiceRequest from "./pages/ServiceRequest";
import Payment from "./components/Payment";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/hire",
        element: <HireTechnician />,
      },
      {
        path: "/service/request",
        element: <RequestService />,
      },
      {
        path: "/payment/:id",
        element: <Payment />,
      },
    ],
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Navigate to="/dashboard/categories" replace={true} />,
      },
      {
        path: "/dashboard/category/new",
        element: <Category />,
      },
      {
        path: "/dashboard/category/edit/:id",
        element: <Category key={Math.random()} />,
      },
      {
        path: "/dashboard/categories",
        element: <MyCategories key={Math.random()} />,
      },
      {
        path: "/dashboard/service/request",
        element: <ServiceRequest />,
      },
      {
        path: "/dashboard/service/all",
        element: <div>Given services</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
