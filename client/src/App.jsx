import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { DarkModeProvider } from "./context/DarkMode.jsx";
import { LanguageProvider } from "./context/Language.jsx";
import { AutContextProvider } from "./context/AuthContext.jsx";
import { PathContextProvider } from "./context/PathContext.jsx";

import { RouteGuardAdmin } from "./guards/RouteGuardAdmin.jsx";
import { RouteGuardAuthenticated } from "./guards/RouteGuardAuthenticated.jsx";

import AppLayout from "./ui/AppLayout.jsx";
import ToasterComponent from "./ui/elements/toaster/ToasterComponent.jsx";

import UserInfo from "./features/users/UserInfo.jsx";
import UpdateUser from "./features/users/UpdateUser.jsx";
import SkatersList from "./features/skaters/SkatersList.jsx";
import History from "./features/users/History.jsx";

import PageNotFound from "./pages/PageNotFound.jsx";
import Home from "./pages/home/Home.jsx";
import LessonsList from "./pages/lessons/LessonsList.jsx";
import Profile from "./pages/user/Profile.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import Admin from "./pages/admin/Admin.jsx";
import AdminInfo from "./features/admin/AdminInfo.jsx";
import ListSkatesOptions from "./features/admin/skatesOption/ListSkatesOptions.jsx";
import ListProtectionOptions from "./features/admin/protectionOption/ListProtectionOptions.jsx";
import ListLevelOptions from "./features/admin/levelOption/ListLevelOptions.jsx";
import ListAgeOptions from "./features/admin/ageOption/ListAgeOptions.jsx";
import ListSubscriptionOptions from "./features/admin/subscriptionOption/ListSubscriptionOptions.jsx";
import Booking from "./features/booking/Booking.jsx";
import Conditions from "./pages/terms_&_Conditions/Conditions.jsx";

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
          <PathContextProvider>
            <div style={{ fontSize: "16px" }}>
              <ReactQueryDevtools initialIsOpen={false} />
            </div>
            <AutContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<AppLayout />}>
                    <Route index element={<Navigate replace to={"home"} />} />
                    <Route path={"home"} element={<Home />} />
                    <Route path={"lessons"} element={<LessonsList />} />
                    <Route path={"booking"} element={<Booking />} />
                    <Route path={"conditions"} element={<Conditions />} />
                    <Route
                      path={"reset-password/:resetToken"}
                      element={<ResetPassword />}
                    />

                    <Route element={<RouteGuardAuthenticated />}>
                      <Route path={"profile"} element={<Profile />}>
                        <Route index element={<UserInfo />} />
                        <Route path={"edit"} element={<UpdateUser />} />
                        <Route path={"skaters"} element={<SkatersList />} />
                        <Route path={"history"} element={<History />} />
                      </Route>

                      <Route element={<RouteGuardAdmin />}>
                        <Route path={"settings"} element={<Admin />}>
                          <Route index element={<AdminInfo />} />
                          <Route
                            path={"skates"}
                            element={<ListSkatesOptions />}
                          />
                          <Route
                            path={"protections"}
                            element={<ListProtectionOptions />}
                          />
                          <Route
                            path={"levels"}
                            element={<ListLevelOptions />}
                          />
                          <Route
                            path={"age-range"}
                            element={<ListAgeOptions />}
                          />
                          <Route
                            path={"subscription"}
                            element={<ListSubscriptionOptions />}
                          />
                        </Route>
                      </Route>
                    </Route>
                  </Route>
                  <Route path={"*"} element={<PageNotFound />} />
                </Routes>
              </BrowserRouter>
              <ToasterComponent />
            </AutContextProvider>
          </PathContextProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </DarkModeProvider>
  );
}

export default App;
