import {Route, Routes} from "react-router-dom";
import SignIn from "./pages/auth/sign-in/SignIn.jsx";
import SignUp from "./pages/auth/sign-up/SignUp.jsx";
import Auth from "./component/auth/Auth.jsx";
import PrivateRouter from "./component/auth/PrivateRouter.jsx";
import HomePage from "./pages/home-page/index.jsx";
import ScheduleAnAppoinment from "./pages/home-page/schedule-an-appointment/ScheduleAnAppoinment.jsx";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth/>}>
        <Route path="/auth/login" element={<SignIn/>}/>
        <Route path="/auth/register" element={<SignUp/>}/>
      </Route>
      <Route path="/" element={
        <PrivateRouter>
          <HomePage/>
        </PrivateRouter>
      }/>
      <Route path="/schedule-an-appointment" element={<ScheduleAnAppoinment/>}/>
    </Routes>)
}

export default App
