import { Link } from "react-router-dom";

const DoctorsTable = ({doctor}) => 
{
  let{id, first_name, last_name, department, gender}=doctor

  return(
    <tr key={id}>
      <td width={"15%"}>{first_name}</td>
      <td width={"15%"}>{last_name}</td>
      <td width={"15%"}>{department}</td>
      <td width={"15%"}>{gender}</td>
      <td width={"10%"}>            
          <Link to={`/dashboard/doctors/${id}`}>
              <button className='btn btn-dark'>View details</button>
          </Link>
      </td>
    </tr>
  )
  // const doctors = [
  //   { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology' },
  //   { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrics' },
  //   { id: 3, name: 'Dr. Adil Johnson', specialty: 'Neurology' },
  // ];

  // const [searchTerm, setSearchTerm] = useState('');

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const filteredDoctors = doctors.filter((doctor) =>
  //   doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // return (
  //   <div> 
  //     <input
  //       type="text"
  //       placeholder="Search by doctor's name..."
  //       onChange={handleSearch}
  //     />
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>ID</th>
  //           <th>Name</th>
  //           <th>Specialty</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {filteredDoctors.map((doctor) => (
  //           <tr key={doctor.id}>
  //             <td>{doctor.id}</td>
  //             <td>{doctor.name}</td>
  //             <td>{doctor.specialty}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
};

export default DoctorsTable;