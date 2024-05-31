import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { SearchPage } from "./pages/SearchPage/SearchPage";
import { Layout } from "./components/Layout/Layout";
import { PropertyPage } from "./pages/PropertyPage/PropertyPage";
import { FavoritesPage } from "./pages/FavoritesPage/FavoritesPage";
import "./index.css";
import { AuthLayout } from "./components/AuthLayout/AuthLayout";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { RequireAuth } from "./helpers/RequireAuth";
import { Provider } from "react-redux";
import store from "./store/store";

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
      {
        path: "/profile",
        element: (
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
      { path: "/favorites", element: <FavoritesPage /> },
      { path: "/property/:id", element: <PropertyPage /> },
    ],
  },
  { path: "*", element: <SearchPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
