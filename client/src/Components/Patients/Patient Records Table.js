const PatientTable = ({patient}) => 
{
    let {id, first_name, last_name, email, gender, address, blood_group, phone}=patient

    return ( 
        <tr key={id}>
            <td width={"12%"} data-label="First Name">{first_name}</td>
            <td width={"12%"} data-label="Last Name">{last_name}</td>
            <td width={"15%"} data-label="Email">{email}</td>
            <td width={"10%"} data-label="Gender">{gender}</td>
            <td width={"15%"} data-label="Phone Number">{phone}</td>
            <td width={"12%"} data-label="Address">{address}</td>
            <td width={"15%"} data-label="Blood Group">{blood_group}</td>
        </tr>
     );
}
 
export default PatientTable;