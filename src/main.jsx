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
import Review from "./pages/Review";
import PrivateRoute from "./components/PrivateRoute";
import ManageUsers from "./components/ManageUsers";

const router = createBrowserRouter([
  // user dashboard
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/hire",
        element: (
          <PrivateRoute>
            <HireTechnician />
          </PrivateRoute>
        ),
      },
      {
        path: "/service/request",
        element: (
          <PrivateRoute>
            <RequestService />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />,
          </PrivateRoute>
        ),
      },
      {
        path: "/review/:id",
        element: <Review />,
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

  // manager dashboard
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
        element: (
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/category/edit/:id",
        element: (
          <PrivateRoute>
            <Category key={Math.random()} />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/categories",
        element: (
          <PrivateRoute>
            <MyCategories key={Math.random()} />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/service/request",
        element: (
          <PrivateRoute>
            <ServiceRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/service/all",
        element: <div>Given services</div>,
      },
    ],
  },

  // admin dashboard
  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Navigate to="/admin/dashboard/users" replace={true} />,
      },
      {
        path: "/admin/dashboard/users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
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
