import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import PatientsPage from './Patients/PatientsPage'
import DoctorsPage from './Doctors/Doctors'
import DoctorDetails from './Doctors/Doctor Details'
import Navbar from '../Navbar'
import Appointments from "./Appointments/Appointments Page";
import Home from "./Home";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => 
{

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => 
    {
        fetch("/dashboard")
        .then(response => response.json())
        .then(data => setLoggedIn(data.loggedIn));
    }, []);
    
    if (!loggedIn) 
    {
        setTimeout(() => 
        {
            toast.error("Kindly log in to continue", { toastId: "loginError" });
        },100)

        return <Navigate to="/"/>
    }

    return (
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
    );
}

export default Dashboard;