import { Outlet, Route, Routes } from "react-router-dom";
import PatientsPage from "./Patients/PatientsPage";
const Dashboard = () => 
{
    return ( 
        <>
            <h1>Navbar goes here</h1>
            <Outlet/>
            <Routes>
                <Route path="/patients" element={<PatientsPage/>}></Route>
            </Routes>
        </>
     );
}
 
export default Dashboard;