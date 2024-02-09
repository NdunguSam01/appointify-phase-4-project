import { Outlet, Route, Routes } from "react-router-dom";
import PatientsPage from './Patients/PatientsPage'
import DoctorsPage from './Doctors/Doctors'
import DoctorDetails from './Doctors/Doctor Details'
import Navbar from '../Navbar'
import Appointments from "./Appointments/Appointments Page";
const Dashboard = () => 
{
    return ( 
        <>
            <Navbar/>
            <Outlet/>
            <Routes>
                <Route path="/patients" element={<PatientsPage/>}></Route>
                <Route path="/doctors" element={<DoctorsPage/>}></Route>
                <Route path="/doctors/:id" element={<DoctorDetails/>}></Route>
                <Route path="/appointments" element={<Appointments/>}></Route>
            </Routes>
        </>
     );
}
 
export default Dashboard;