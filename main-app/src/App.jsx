import { useEffect, createContext, useState } from "react";
import AuthPage from "./pages/auth/auth";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Global from "./pages/home/global";
import Home from "./pages/home/home.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Transcription from "./pages/transcription/transcription.jsx";
import TranscriptionDetailed from "./pages/transcription/transcription_detailed-log.jsx";
import About from "./pages/StandardPages/About.jsx";
import Why from "./pages/StandardPages/Why.jsx";
import Price from "./pages/StandardPages/Price.jsx";

export const windowCtx = createContext();

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Global />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "transcription",
        element: <Transcription />,
      },
      {
        path: "detailed-log",
        element: <TranscriptionDetailed />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "whyTranscripta",
        element: <Why />,
      },
      {
        path: "pricing",
        element: <Price />,
      },
    ],
  },
]);

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
