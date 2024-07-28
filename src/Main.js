import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import WelcomePage from "./pages/WelcomePage";
import TodoPage from "./pages/TodoPage";
import NotFoundPage from "./pages/NotFoundPage";
import Calendar from "./components/Calendar";
import CalendarPage from "./pages/CalendarPage";
import ManagementPage from "./pages/ManagementPage";
import { MainProvider } from "./MainContext";

function Main() {
  return (
    <MainProvider>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/management" element={<ManagementPage />} />
        <Route path="/test" element={<Calendar />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainProvider>
  );
}

export default Main;
