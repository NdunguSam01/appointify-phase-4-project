import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import PatientsPage from './Patients/PatientsPage'
import DoctorsPage from './Doctors/Doctors'
import DoctorDetails from './Doctors/Doctor Details'
import Navbar from '../Navbar'
import Appointments from "./Appointments/Appointments Page";
import Home from "./Home";

const Dashboard = ({loggedIn}) => 
{
    return (
        <>
            {loggedIn ?
            <>
                <Navbar />
                <Outlet />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/patients" element={<PatientsPage />} />
                    <Route path="/doctors" element={<DoctorsPage />} />
                    <Route path="/doctors/:id" element={<DoctorDetails />} />
                    <Route path="/appointments" element={<Appointments />} />
                </Routes>
            </>
            :
                <Navigate to="/"/>
            }
            
        </>
    );
}

export default Dashboard;