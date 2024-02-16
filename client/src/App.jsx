import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { DarkModeProvider } from "./context/DarkMode.jsx";
import { LanguageProvider } from "./context/Language.jsx";
import { AutContextProvider } from "./context/AuthContext.jsx";

import AppLayout from "./ui/AppLayout.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Login from "./pages/auth/Login.jsx";
import Home from "./pages/home/Home.jsx";
import LessonsList from "./pages/lessons/LessonsList.jsx";
import ToasterComponent from "./ui/elements/toaster/ToasterComponent.jsx";
import Profile from "./pages/user/Profile.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <div style={{ fontSize: "16px" }}>
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
          <AutContextProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route index element={<Navigate replace to={"/"} />} />
                  <Route path={"/"} element={<Home />} />
                  <Route path={"lessons"} element={<LessonsList />} />
                  <Route path={"profile"} element={<Profile />} />
                </Route>
                <Route path={"login"} element={<Login />} />
                <Route path={"*"} element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
            <ToasterComponent />
          </AutContextProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </DarkModeProvider>
  );
}

export default App;
