import React, { useContext } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { UIContext } from "./state/UI.module";
import { getTheme } from "./theme/Theme";

import { HomePage } from "./pages/Home.page";
import { SignUpPage } from "./pages/SignUp.page";
import { CaloriesPage } from "./pages/Calories.page";
import { ProfilePage } from "./pages/Profile.page";
import { LogOut } from "./pages/LogOut.page";
import { NotFoundPage as NotFound } from "./pages/NotFound.page";
import { Test as TestPage } from "./pages/Test.page";
import WeeklySummary from "./pages/WeeklySummary";


<Route path="/weekly-summary" component={WeeklySummary} />

function App() {
  const { mode } = useContext(UIContext);

  const theme = getTheme({ mode });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/calories" element={<CaloriesPage />} />
          <Route path="test" element={<TestPage />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/weekly-summary" element={<WeeklySummary/>} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

