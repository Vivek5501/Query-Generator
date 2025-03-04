import Login from "./Login";
import Browse from "./Browse";
import QuerySearch from "./QuerySearch";
import QueryGenerator from "./QueryGenerator"; // Import QueryGenerator
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    
    {
      path: "/query-generator", // New route for QueryGenerator
      element: <QueryGenerator />, // This renders the QueryGenerator component
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
