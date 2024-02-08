import React, { useState } from "react";

const PatientRegistrationForm = () => 
{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleBloodGroupChange = (e) => {
    setBloodGroup(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Patient Registration Form Submitted:", {
      name,
      email,
      phone,
      dob,
      gender,
      address,
      bloodGroup,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>PATIENT REGISTRATION FORM</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" value={phone} onChange={handlePhoneChange} />
      </div>
      <div>
        <label htmlFor="dob">Date of Birth:</label>
        <input type="date" id="dob" value={dob} onChange={handleDobChange} />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" value={gender} onChange={handleGenderChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" value={address} onChange={handleAddressChange} />
      </div>
      <div>
        <label htmlFor="bloodGroup">Blood Group:</label>
        <select id="bloodGroup" value={bloodGroup} onChange={handleBloodGroupChange}>
          <option value="">Select</option>
          <option value="a+">A+</option>
          <option value="a-">A-</option>
          <option value="b+">B+</option>
          <option value="b-">B-</option>
          <option value="ab+">AB+</option>
          <option value="ab-">AB-</option>
          <option value="o+">O+</option>
          <option value="o-">O-</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PatientRegistrationForm;