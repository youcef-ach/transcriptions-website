import { useEffect, createContext, useState } from "react";
import AuthPage from "./pages/auth/auth";
import Test from "./test";
import Test2 from "./text2";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Global from "./pages/home/global";
import Home from './pages/home/home.jsx';
import Dashboard from './pages/dashboard/dashboard.jsx'

export const windowCtx = createContext();

const myRouter = createBrowserRouter(
  [
    {
      path: '/',
      element: <Global />,
      children: [
        {
          path: 'home',
          element: <Home />
        },
        {
          path: 'auth',
          element: <AuthPage />
        },
        {
          path: 'dashboard',
          element: <Dashboard />
        },
      ]
    }
  ]
)

const App = () => {

  const [windowDimentions, setWindowDimentions] = useState([
    window.innerHeight,
    window.innerWidth,
  ]);

  useEffect(
    () =>
      window.addEventListener("resize", () =>
        setWindowDimentions([window.innerHeight, window.innerWidth])
      ),
    []
  );

  return (
    <windowCtx.Provider value={windowDimentions}>
      <RouterProvider router={myRouter} />
    </windowCtx.Provider>
  );
};
export default App;