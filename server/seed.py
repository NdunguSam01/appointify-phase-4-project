from faker import Faker
from models import db, Admin, Patient, Doctor, Appointment
from app import app
import random

faker=Faker()

if __name__ == "__main__":
    with app.app_context():
        Admin.query.delete()
        Patient.query.delete()
        Doctor.query.delete()
        Appointment.query.delete()

        admins=[]

        for _ in range(5):
            new_admin=Admin(first_name=faker.first_name(), last_name=faker.last_name(), password="123456", email=faker.email())
            admins.append(new_admin)

        db.session.add_all(admins)

        patients=[]
        genders=["Male", "Female"]
        for _ in range(15):
            new_patient=Patient(first_name=faker.first_name(), last_name=faker.last_name(),email=faker.email(), phone=faker.phone_number(), age=random.randint(1, 150), gender=random.choice(genders))
            patients.append(new_patient)

        db.session.add_all(patients)

        doctors=[]
        departments=["Oncology", "Radiology", "Phlebotomy"]
        for _ in range(20):
            new_doctor=Doctor(first_name=faker.first_name(), last_name=faker.last_name(),age=random.randint(25, 80), gender=random.choice(genders), department=random.choice(departments), experience=random.randint(1, 40))
            doctors.append(new_doctor)

        db.session.add_all(doctors)

        db.session.commit()