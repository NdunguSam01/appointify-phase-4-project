from flask_sqlalchemy import SQLAlchemy

db=SQLAlchemy()

class Admin(db.Model):

    __tablename__ = "admins"

    id=db.Column(db.Integer, primary_key=True)
    first_name=db.Column(db.String, nullable=False)
    last_name=db.Column(db.String, nullable=False)
    email=db.Column(db.String, unique=True)
    password=db.Column(db.String, nullable=False)

    admin_added_appointments=db.relationship("Appointment", backref="admin")

class Patient(db.Model):

    __tablename__ = "patients"

    id=db.Column(db.Integer, primary_key=True)
    first_name=db.Column(db.String, nullable=False)
    last_name=db.Column(db.String, nullable=False)
    email=db.Column(db.String, unique=True, nullable=False)
    phone=db.Column(db.String, unique=True, nullable=False)
    age=db.Column(db.Integer, nullable=False)
    gender=db.Column(db.Enum('Male', 'Female'), nullable=False)

    appointments=db.relationship("Appointment", backref="patient")
    doctors=db.relationship("Doctor", secondary="appointments", uselist=True, backref="patients", viewonly=True)

    def __repr__(self):
        return f"\nPatient name: {self.first_name} {self.last_name}\nAge: {self.age}\nEmail: {self.email}\nPhone: {self.phone}\nGender: {self.gender}\n"

class Doctor(db.Model):

    __tablename__ = "doctors"

    id=db.Column(db.Integer, primary_key=True)
    first_name=db.Column(db.String, nullable=False)
    last_name=db.Column(db.String, nullable=False)
    age=db.Column(db.Integer, nullable=False)
    gender=db.Column(db.Enum('Male', 'Female'), nullable=False)
    department=db.Column(db.String, nullable=False)
    experience=db.Column(db.Integer, nullable=False)

    doctor_appointments=db.relationship("Appointment", backref="doctor")

    def __repr__(self):
        return f"\Doctor name: {self.first_name} {self.last_name}\nAge: {self.age}\nGender: {self.gender}\nDepartment: {self.department}\nYears of experience: {self.experience}"

class Appointment(db.Model):

    __tablename__ = "appointments"

    id=db.Column(db.Integer, primary_key=True)
    patient_id=db.Column(db.Integer, db.ForeignKey("patients.id"))
    doctor_id=db.Column(db.Integer, db.ForeignKey("doctors.id"))
    date=db.Column(db.Date, nullable=False)
    time=db.Column(db.Time, nullable=False)
    puprose=db.Column(db.String, nullable=False)
    admin_id=db.Column(db.Integer, db.ForeignKey("admins.id"))