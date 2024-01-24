import { useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

import { themeSettings } from "./theme";
import Layout from "./scenes/layout";
import Dashboard from "./scenes/dashboard";
import Products from "./scenes/products";
import Customers from "./scenes/customers";
import Transactions from "./scenes/transactions";
import Geography from "./scenes/geography";
import Overview from "./scenes/overview";
import Daily from "./scenes/daily";
import Monthly from "./scenes/monthly";
import Breakdown from "./scenes/breakdown";
import Admin from "./scenes/admin";
import Performance from "./scenes/performance";
import Yearly from "./scenes/yearly";
import Topic from "./scenes/topic";
import Region from "./scenes/region";
import { ConstructionRounded } from "@mui/icons-material";



function App() {
  const [task, setTask] = useState("")
  // 'useSelector' is used to access the 'state' provided by the State provider(Redux)
  const mode = useSelector((state) => {
    // console.log("State Passed to the Application is :", state);
    return state.global.mode;
  })
  // console.log("mode is : ", mode);

  const theme = useMemo(() =>
    createTheme(themeSettings(mode)),
    [mode]);
  // console.log("theme is : ", theme);

  const getAppData = (data) => {
    // console.log("App data is : ", data)
    setTask(data)
  }

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* 'CssBaseline' basically reset CSS settings to default */}
          <CssBaseline />

          <Routes>
            <Route element={<Layout getAppData={getAppData} />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/performance" element={<Performance />} />
              {/* <Route path="/customers" element={<Customers />} /> */}
              {/* <Route path="/transactions" element={<Transactions />} /> */}
              {/* <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} /> */}
              {/* <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} /> */}
              <Route path="/summit" element={<Products task={task} />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/yearly" element={<Yearly />} />
              <Route path="/topic" element={<Topic />} />
              <Route path="/region" element={<Region />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
