import React, { Component } from "react";

class IndividualDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: this.props.experience || "Not specified",
    };
  }

  getAppointmentsUrl = () => {                                        
    const baseUrl = "https://your-app-url.com/appointments";
    const doctorId = this.props.id;

    return `${baseUrl}/doctor/${doctorId}`;
  }

  render() {
    const { firstName, lastName, gender, department } = this.props;

    return (
      <div className="doctor-profile">
        <h2>
          {firstName} {lastName}
          <a href={this.getAppointmentsUrl()} className="appointments-link">
            (View Appointments)
          </a>
        </h2>
        <p>Age: {this.props.age || "Not specified"}</p>
        <p>Gender: {gender}</p>
        <p>Department: {department}</p>
        <p>Experience: {this.state.experience}</p>
      </div>
    );
  }
}

export default IndividualDoctor;