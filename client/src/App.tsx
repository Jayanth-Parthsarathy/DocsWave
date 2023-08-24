import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DocumentView from "./pages/DocumentView";
import socket from "./libs/socket";
import Create from "./pages/Create";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/document/:id",
    element: <DocumentView socket={socket} />,
  },
  {
    path: "/create",
    element: <Create />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
