from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
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
    dob=db.Column(db.String, nullable=False)
    gender=db.Column(db.Enum('Male', 'Female'), nullable=False)
    blood_group=db.Column(db.String, nullable=False)
    address=db.Column(db.String, nullable=False)

    appointments=db.relationship("Appointment", backref="patient")
    doctors=db.relationship("Doctor", secondary="appointments", uselist=True, backref="patients", viewonly=True)

    @validates("gender")
    def validate_gender(self, key, gender):
        genders=["Male", "Female"]

        if not gender:
            return ValueError("Gender cannot be empty")
        
        elif gender not in genders:
            return ValueError("Gender must be Male or Female")
        
        return gender
    
    @validates("age")
    def validate_age(self, key, age):
        if age <=0 or age>=150:
            return ValueError("Enter a valid age")
        
        return age
    
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

    @validates("age")
    def validate_age(self, key, age):
        if age <=25 or age>=150:
            return ValueError("Enter a valid age")
        
        return age
    
    @validates("gender")
    def validate_gender(self, key, gender):
        genders=["Male", "Female"]

        if not gender:
            return ValueError("Gender cannot be empty")
        
        elif gender not in genders:
            return ValueError("Gender must be Male or Female")
        
        return gender
    
    @validates("experience")
    def validate_experience(self, key, experience):
        if  experience <= 0 or experience >= 60:
            return ValueError("Invalid years of experience")
        
        return experience
    
    def __repr__(self):
        return f"\nDoctor name: {self.first_name} {self.last_name}\nAge: {self.age}\nGender: {self.gender}\nDepartment: {self.department}\nYears of experience: {self.experience}"



class Appointment(db.Model):

    __tablename__ = "appointments"

    id=db.Column(db.Integer, primary_key=True)
    patient_id=db.Column(db.Integer, db.ForeignKey("patients.id"))
    doctor_id=db.Column(db.Integer, db.ForeignKey("doctors.id"))
    date=db.Column(db.Date, nullable=False)
    time=db.Column(db.Time, nullable=False)
    puprose=db.Column(db.String, nullable=False)
    admin_id=db.Column(db.Integer, db.ForeignKey("admins.id"))