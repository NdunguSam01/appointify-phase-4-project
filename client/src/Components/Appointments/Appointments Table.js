const AppointmentsTable = ({appointments}) => 
{
    return (
        <tbody>
            {appointments.map(appointment => 
                {
                    let{id, date, purpose, time, doctor, patient}=appointment
                    let doctor_name=`${doctor.first_name} ${doctor.last_name}`
                    let patient_name=`${patient.first_name} ${patient.last_name}`  

                    return (  
                        <tr key={id}>
                            <td>{patient_name}</td>
                            <td>{doctor_name}</td>
                            <td>{date}</td>
                            <td>{time}</td>
                            <td>{purpose}</td>
                        </tr>
                    );
                })
            }
        </tbody>
    );
}
 
export default AppointmentsTable;
