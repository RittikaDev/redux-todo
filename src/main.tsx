import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/route";
import { ThemeProvider } from "./providers/theme-provider";
import React from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        {/* LETTING REACT KNOW THAT WE ARE USING createBrowserRouter */}
        <RouterProvider router={routes} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
