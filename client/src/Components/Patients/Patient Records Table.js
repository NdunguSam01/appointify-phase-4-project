const PatientTable = ({patient}) => 
{
    console.log(patient)
    let {id, first_name, last_name, email, gender, address, blood_group, phone}=patient

    return ( 
        <tr key={id}>
            <td width={"12%"}>{first_name}</td>
            <td width={"12%"}>{last_name}</td>
            <td width={"15%"}>{email}</td>
            <td width={"10%"}>{gender}</td>
            <td width={"15%"}>{phone}</td>
            <td width={"12%"}>{address}</td>
            <td width={"15%"}>{blood_group}</td>
        </tr>
     );
}
 
export default PatientTable;