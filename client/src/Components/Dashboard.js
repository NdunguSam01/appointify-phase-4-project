import { Outlet, Route, Routes } from "react-router-dom";
import Test from "../Test";
const Dashboard = () => 
{
    return ( 
        <>
            <h1>Navbar goes here</h1>
            <Outlet/>
            <Routes>
                <Route path='/test' element={<Test/>}></Route>
            </Routes>
        </>
     );
}
 
export default Dashboard;