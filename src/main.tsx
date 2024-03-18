import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Signin } from "./Pages/signin/Signin";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Signup } from "./Pages/signup/Signup";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signin", element: <Signin /> },
  { path: "/signup", element: <Signup /> }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ConvexProvider client={convex}>
        <RouterProvider router={router} />
      </ConvexProvider>
    </Provider>
  </StrictMode>,
);
