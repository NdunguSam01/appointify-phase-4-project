from flask import Flask, jsonify, request, session, make_response
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from .models import db, Admin, Patient, Doctor, Appointment
import hashlib
from datetime import datetime
from .schema import PatientSchema, DoctorSchema, AppointmentSchema, AdminSchema
import os

app=Flask(__name__)

#Configuring the database
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key="cksckdhsbidbkcldjiefo"
#Adding an API to the application
api=Api(app)

CORS(app)

#Creating a database migration
migrate=Migrate(app, db)
db.init_app(app)

class Index(Resource):
    def get(self):
        return "Main Page"
    
api.add_resource(Index, "/")

class AdminLogin(Resource):
    def post(self):
        email=request.json["email"]
        password=request.json["password"]

        admin=Admin.query.filter(Admin.email==email).first()

        if not admin:
            return make_response(jsonify("No acount exists with the given email"),401)
        
        if admin.password != hashlib.md5(password.encode("utf-8")).hexdigest():
            return make_response(jsonify("Incorrect password"), 401)

        session["admin_id"]=admin.id
        return make_response(jsonify("Login successful"), 200)

api.add_resource(AdminLogin, "/login")

class Register(Resource):
    def post(self):
        first_name=request.json["first_name"]
        last_name=request.json["last_name"]
        email=request.json["email"]
        password=request.json["password"]
        confirm_password=request.json["confirm_password"]
        
        if Admin.query.filter(Admin.email==email).first():
            return make_response(jsonify("An account with the given email already exists"), 400)

        elif password != confirm_password:
            return make_response(jsonify("Passwords do not match!"), 400)
        
        elif Admin.query.filter(Admin.first_name==first_name and Admin.last_name==last_name).first():
            return make_response(jsonify("An account with the given names already exists"), 400)
        
        hashed_password=hashlib.md5(password.encode("utf-8")).hexdigest()
        new_admin=Admin(last_name=last_name, email=email, first_name=first_name, password=hashed_password)
        db.session.add(new_admin)
        db.session.commit()
        return make_response(jsonify("Account created successfully"), 201)

api.add_resource(Register, "/register")

class Dashboard(Resource):
    def get(self):
        patient_count=Patient.query.count()
        doctor_count=Doctor.query.count()
        appoinments_count=Appointment.query.count()

        if  "admin_id" in session:
            admin_id=session["admin_id"]
            admin=Admin.query.get(admin_id)
            admin_dict=AdminSchema(only=("first_name", "last_name")).dump(admin)

            return make_response(jsonify(
                {
                    "loggedIn": True,
                    "patients": patient_count,
                    "doctors": doctor_count,
                    "appointments": appoinments_count,
                    "admin": admin_dict
                }), 200)
        
        else:
            return make_response(jsonify({"loggedIn": False}))

api.add_resource(Dashboard, "/dashboard")

class Patients(Resource):
    def get(self):
        patients=Patient.query.all()
        patients_schema=PatientSchema(many=True)
        patients_dict=patients_schema.dump(patients)
        return make_response(patients_dict, 200)

    def post(self):
        first_name=request.json["first_name"]
        last_name=request.json["last_name"]
        email=request.json["email"]
        phone=request.json["phone_number"]
        dob=request.json["dob"]
        gender=request.json["gender"]
        address=request.json["address"]
        blood_group=request.json["blood_group"]
        gender_validation=Patient().validate_gender(key=gender, gender=gender)

        if gender_validation != gender:
            return make_response(jsonify("Gender must be either Male or Female"), 400)
        
        new_patient=Patient(first_name=first_name, last_name=last_name, email=email, phone=phone, dob=dob, gender=gender, address=address, blood_group=blood_group)
        db.session.add(new_patient)
        db.session.commit()
        patient_schema=PatientSchema()
        patient=patient_schema.dump(new_patient)
        return make_response(patient, 201)

api.add_resource(Patients, "/patients")

class Doctors(Resource):
    def  get(self):
        doctors=Doctor.query.all()
        doctors_schema=DoctorSchema(many=True)
        doctors_dict=doctors_schema.dump(doctors)
        return make_response(doctors_dict, 200)

    def post(self):
        first_name=request.json["first_name"]
        last_name=request.json["last_name"]
        age=int(request.json["age"])
        gender=request.json["gender"]
        department=request.json["department"]
        experience=int(request.json["experience"])

        age_validation=Doctor().validate_age(age=age, key=age)
        gender_validation=Doctor().validate_gender(key=gender, gender=gender)
        experience_validation=Doctor().validate_experience(key=experience, experience=experience)

        if age_validation != age:
            return make_response(jsonify("Age must be a number between 25 and 100"), 400)
        
        elif gender_validation != gender:
            return make_response(jsonify("Invalid gender"), 400)

        elif experience_validation != experience:
            return make_response(jsonify("Years of experience must be between 1 and 60"), 400)
        
        new_doctor=Doctor(last_name=last_name, age=age, experience=experience, first_name=first_name, department=department, gender=gender)
        db.session.add(new_doctor)
        db.session.commit()
        doctor_schema=DoctorSchema()
        return make_response(doctor_schema.dump(new_doctor), 201)

api.add_resource(Doctors, "/doctors")

class PatientsByID(Resource):
    def get(self, id):
        patient=Patient.query.filter(Doctor.id == id).first()

        if not patient:
            return make_response(jsonify("Patient could not be found!"), 404)
        
        patient_schema=PatientSchema()
        patient_dict=patient_schema.dump(patient)
        return make_response(patient_dict, 200)

api.add_resource(PatientsByID, "/patients/<int:id>")
class DoctorsByID(Resource):
    def get(self, id):
        doctor=Doctor.query.filter(Doctor.id == id).first()

        if not doctor:
            return make_response(jsonify("Doctor could not be found!"), 404)
        
        doctor_schema=PatientSchema()
        doctor_dict=doctor_schema.dump(doctor)
        return make_response(doctor_dict, 200)

    def patch(self, id):
        doctor_to_patch=Doctor.query.filter(Doctor.id == id).first()

        if not doctor_to_patch:
            return make_response(jsonify("Doctor could not be found"), 404)

        updated_first_name=request.json["first_name"]
        updated_last_name=request.json["last_name"]
        updated_department=request.json["department"]

        if doctor_to_patch.first_name != updated_first_name or doctor_to_patch.last_name != updated_last_name or doctor_to_patch.department != updated_department:
            doctor_to_patch.first_name=updated_first_name
            doctor_to_patch.last_name=updated_last_name
            doctor_to_patch.department=updated_department

            db.session.add(doctor_to_patch)
            db.session.commit()
            return make_response(jsonify("Doctor information updated successfully"), 200)
        
        else:
            return make_response(jsonify("Error: Could not update information"), 400)

    def delete(self, id):
        doctor=Doctor.query.filter(Doctor.id == id).first()

        if not doctor:
            return make_response(jsonify("Doctor could not be found"), 404)
        
        db.session.delete(doctor)
        db.session.commit()
        return make_response(jsonify("Doctor deleted successfully"), 200)

api.add_resource(DoctorsByID, "/doctors/<int:id>")

class Appointments(Resource):
    def get(self):
        appointments=Appointment.query.all()
        patients=Patient.query.all()
        doctors=Doctor.query.all()

        patients_dict=PatientSchema(only=("id","first_name","last_name"), many=True).dump(patients)
        doctors_dict=DoctorSchema(only=("id","first_name", "last_name"), many=True).dump(doctors)
        appointments_dict=AppointmentSchema(many=True).dump(appointments)
        response=[
            {
                "patients": patients_dict,
                "doctors": doctors_dict,
                "appointments": appointments_dict
            }
        ]
        return make_response(response, 200)

    def post(self):
        patient_id=request.json['patient_id']
        doctor_id=request.json['doctor_id']
        date=datetime.strptime(request.json['date'],'%Y-%m-%d').date()
        time=datetime.strptime(request.json['time'], '%H:%M').time()
        purpose=request.json['purpose']
        admin_id=session["admin_id"]

        if patient_id and doctor_id and date and time and purpose:
            new_appointment=Appointment(patient_id=patient_id, doctor_id=doctor_id, date=date, time=time, purpose=purpose, admin_id=admin_id)
            db.session.add(new_appointment)
            db.session.commit()
            appointment_schema=AppointmentSchema()
            return make_response(appointment_schema.dump(new_appointment), 201)
        
        else:
            return make_response(jsonify("Kindly fill in all the fields"), 400)

api.add_resource(Appointments, "/appointments")

class LogOut(Resource):
    def post(self):
        session.pop("admin_id", None)
        return make_response(jsonify("Logged out successfully"), 200)

api.add_resource(LogOut, "/logout")
if __name__ == "__main__":
    app.run(port=5555, debug=True)