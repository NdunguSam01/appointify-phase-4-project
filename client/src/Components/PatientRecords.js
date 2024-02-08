import React, { Component } from 'react';
// import PatientRecord from './PatientRecord';

class PatientRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
    };
  }

  componentDidMount() {
    fetch('')
      .then(response => response.json())
      .then(data => this.setState({ records: data }))
      .catch(error => console.error('Error fetching records:', error));
  }

  handleViewDetail = id => {
    
    this.props.history.push(`/patient-details/${id}`);
  };

  render() {
    return (
      <div>
        {/* {this.state.records.map(record => (
          <PatientRecord
            key={record.id}
            record={record}
            onViewDetail={this.handleViewDetail}
          />
        ))} */}
      </div>
    );
  }
}

export default PatientRecords;