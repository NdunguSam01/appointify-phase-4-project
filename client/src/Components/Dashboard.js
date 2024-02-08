import { Outlet, Route, Routes } from "react-router-dom";
const Dashboard = () => 
{
    return ( 
        <>
            <h1>Navbar goes here</h1>
            <Outlet/>
            <Routes>
            </Routes>
        </>
     );
}
 
export default Dashboard;