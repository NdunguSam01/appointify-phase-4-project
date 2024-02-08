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

        db.session.commit()