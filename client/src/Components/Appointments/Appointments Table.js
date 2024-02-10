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
                            <td data-label="Patient's Name">{patient_name}</td>
                            <td data-label="Doctor's Name">{doctor_name}</td>
                            <td data-label="Date">{date}</td>
                            <td data-label="Time">{time}</td>
                            <td data-label="Purpose">{purpose}</td>
                        </tr>
                    );
                })
            }
        </tbody>
    );
}
 
export default AppointmentsTable;
