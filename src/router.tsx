import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ShowItemPage from "./pages/ShowItemPage";
import AddItemPage from "./pages/AddItemPage";
import EditItemPage from "./pages/EditItemPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <LogIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "showitem", element: <ShowItemPage /> },
      { path: "additem", element: <AddItemPage /> },
      { path: "edititem", element: <EditItemPage /> },
    ],
  },
]);

export default router;
