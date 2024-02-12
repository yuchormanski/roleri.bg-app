import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./ui/AppLayout.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Login from "./pages/auth/Login.jsx";
import Home from "./pages/home/Home.jsx";
import LessonsList from "./pages/lessons/LessonsList.jsx";
import ToasterComponent from "./ui/elements/toaster/ToasterComponent.jsx";
import { DarkModeProvider } from "./context/DarkMode.jsx";

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
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          initialIsOpen={false}
          style={{ fontSize: "16px" }}
        />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to={"home"} />} />
              <Route path={"home"} element={<Home />} />
              <Route path={"lessons"} element={<LessonsList />} />
            </Route>
            <Route path={"login"} element={<Login />} />
            <Route path={"*"} element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <ToasterComponent />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
