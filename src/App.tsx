import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Footer from "./components/parts/Footer";
import Navigation from "./components/parts/Navigation";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/form/PersistLogin";
import "./styles/App.css";
import Booking from "./pages/Booking";
import AddBooking from "./pages/AddBooking";
import ChangePassword from "./pages/ChangePassword";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/fr";
import DisplayBookingConfirmation from "./pages/DisplayBookingConfirmation";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordSaveNew from "./pages/ResetPasswordSaveNew";
const locale = "fr-FR";

const ROLES = {
  Client: 1,
  Partner: 2,
  Admin: 3,
};

function App() {
  return (
    <main>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="resetpassword" element={<ResetPassword />} />
            <Route
              path="resetpassword/new/:token"
              element={<ResetPasswordSaveNew />}
            />
            <Route path="/booking/create/:id" element={<AddBooking />} />
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<Home />} />

            {/* protected routes*/}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[ROLES.Client]} />}>
                <Route path="profile" element={<Profile />} />
                <Route path="booking" element={<Booking />} />
                <Route
                  path="booking/confirmation/:id"
                  element={<DisplayBookingConfirmation />}
                />
                <Route
                  path="profile/changepassword"
                  element={<ChangePassword />}
                />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="admin" element={<Admin />} />
              </Route>
            </Route>
          </Route>
        </Routes>
        <Footer />
      </LocalizationProvider>
    </main>
  );
}

export default App;
