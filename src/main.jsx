import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { SearchPage } from "./pages/SearchPage/SearchPage";
import { Layout } from "./components/Layout/Layout";
import { PropertyPage } from "./pages/PropertyPage/PropertyPage";
import { FavoritesPage } from "./pages/FavoritesPage/FavoritesPage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      { path: "/search", element: <SearchPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/auth", element: <ProfilePage /> },
      { path: "/favorites", element: <FavoritesPage /> },
      { path: "/property/:id", element: <PropertyPage /> },
    ],
  },
  { path: "*", element: <SearchPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
