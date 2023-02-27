import "./styles/App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./components/Home";
import Create from "./components/dashboard/create/Create";
import Header from "./components/Header";
import Navbar from "./components/NavBar";
import Login from "./components/dashboard/login/Login";
import Profile from "./components/dashboard/profile/Profile";
import Signup from "./components/dashboard/login/Signup";
import Macro from "./components/dashboard/macro/Macro";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "./themes/theme.ts";

function App() {
  /*  const [token] = useState(AuthService.getCurrentUser()); */
  const token = true;

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <BrowserRouter>
        {/*  <Header /> */}
        <div className="Container">
          <Grid container spacing={2}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="create" element={token ? <Create /> : <Login />} />
              <Route path="create/:id" element={<Create />} />
              <Route path="login" element={token ? <Home /> : <Login />} />
              <Route path="macro" element={token ? <Macro /> : <Login />} />
              <Route path="profile" element={token ? <Profile /> : <Login />} />

              <Route path="register" element={token ? <Home /> : <Signup />} />
            </Routes>
          </Grid>
        </div>
        <Navbar />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
