import {Route, Routes} from "react-router-dom";
import SignIn from "./pages/auth/sign-in/SignIn.jsx";
import SignUp from "./pages/auth/sign-up/SignUp.jsx";
import Auth from "./component/auth/Auth.jsx";
import PrivateRouter from "./component/auth/PrivateRouter.jsx";
import HomePage from "./pages/home-page/index.jsx";
import ScheduleAnAppoinment from "./pages/home-page/schedule-an-appointment/ScheduleAnAppoinment.jsx";
import CreateMedicalRecords from "./pages/admin/create-medical-records/CreateMedicalRecords.jsx";
import ContactForm from "./pages/contact/Contact.jsx";
import AppointmentList from "./pages/appointment-list/AppointmentList.jsx";
import Admin from "./pages/admin/Admin.jsx";
import FacultyManagement from "./pages/admin/faculty-management/FacultyManagement.jsx";

import Profile from "./pages/profile/index.jsx";
import ManagerUser from "./pages/admin/manager-user/ManagerUser.jsx";
import DoctorList from "./pages/doctor-list/DoctorList.jsx";
import Doctor from "./pages/doctor/Doctor.jsx";
import AppointmentListForDoctor from "./pages/doctor/component/AppointmentListForDoctor.jsx";
import ScheduleAnAppoinmentForId from "./pages/component/ScheduleAnAppoinment/ScheduleAnAppoinmentForId.jsx";

function App() {
    return (<Routes>
        <Route path="/auth" element={<Auth/>}>
            <Route path="/auth/login" element={<SignIn/>}/>
            <Route path="/auth/register" element={<SignUp/>}/>
        </Route>
        <Route path="/" element={<PrivateRouter>
            <HomePage/>
        </PrivateRouter>}/>
        <Route path="/schedule-an-appointment" element={<ScheduleAnAppoinment/>}/>
        <Route path="/schedule-an-appointment/:id" element={<ScheduleAnAppoinmentForId/>}/>
        <Route path="/contact" element={<ContactForm/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/appointment-list" element={<AppointmentList/>}/>
        <Route path="/admin" element={<Admin/>}>
            <Route path="/admin/faculty-management" element={<FacultyManagement/>}/>
            <Route path="/admin/user-management" element={<ManagerUser/>}/>
        </Route>
        <Route path="/doctor-list" element={<DoctorList/>}/>
        <Route path="/doctor" element={<Doctor/>}>
            <Route path="/doctor/create-medical-records" element={<CreateMedicalRecords/>}/>
            <Route path="/doctor/appointment-list" element={<AppointmentListForDoctor/>}/>
        </Route>
    </Routes>)
}

export default App
