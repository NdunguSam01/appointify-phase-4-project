import { Outlet, Route, Routes } from "react-router-dom";
import PatientsPage from './Patients/PatientsPage'
import Navbar from '../Navbar'
const Dashboard = () => 
{
    return ( 
        <>
            <Navbar/>
            <Outlet/>
            <Routes>
                <Route path="/patients" element={<PatientsPage/>}></Route>
            </Routes>
        </>
     );
}
 
export default Dashboard;