import logo from './logo.svg';
import './App.css';
import PatientsPage from './Components/PatientsPage';
import PatientDetailsPage from './Components/PatientsDetails'
import PatientRecords from './Components/PatientRecords'
import PatientRegistrationForm from './Components/PatientsRegistrationForm'
import DoctorsTable from './Components/DoctorsTable'
import DoctorsTable from './Components/DoctorsTable'
import IndividualDoctor from './Components/DoctorsPage'
import function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
