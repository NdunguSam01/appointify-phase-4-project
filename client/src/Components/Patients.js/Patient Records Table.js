import {Link} from 'react-router-dom'
const PatientTable = ({patient}) => 
{
    let {id, first_name, last_name, email}=patient
    return ( 
        <tr key={id}>
            <td width={"15%"}>{first_name}</td>
            <td width={"15%"}>{last_name}</td>
            <td width={"15%"}>{email}</td>
            <td width={"10%"}>            
                <Link to={`/patients/${id}`}>
                    <button className='btn btn-dark'>View details</button>
                </Link>
            </td>
        </tr>
     );
}
 
export default PatientTable;