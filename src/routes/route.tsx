import App from "@/App";
import Tasks from "@/pages/tasks";
import Users from "@/pages/users";
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
			{
				path: "users",
				index: true, // WILL LOAD THIS WEHN CLICKED "/"
				element: <Users />,
			},
		],
	},
]);

export default routes;
