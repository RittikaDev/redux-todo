import App from "@/App";
import Tasks from "@/pages/tasks";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        // path: "tasks",
        index: true, // WILL LOAD THIS WEHN CLICKED "/"
        element: <Tasks />,
      },
    ],
  },
]);

export default routes;
