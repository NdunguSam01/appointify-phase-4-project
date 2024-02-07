from flask import Flask, jsonify, request, session, make_response
from flask_restful import Api, Resource
from flask_migrate import Migrate
from models import db, Admin, Patient, Doctor, Appointment
import hashlib

app=Flask(__name__)

#Configuring the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///appointify.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#Adding an API to the application
api=Api(app)

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
            return make_response(jsonify({"error": "No acount exists with the given email"}),401)
        
        if admin.password != hashlib.md5(password.encode("utf-8")).hexdigest():
            return make_response(jsonify("Incorrect password"), 401)

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
            return make_response(jsonify("An account with the given email already exists"), 401)

        if password != confirm_password:
            return make_response(jsonify("Passwords do not match!"))
        
        hashed_password=hashlib.md5(password.encode("utf-8")).hexdigest()
        new_admin=Admin(last_name=last_name, email=email, first_name=first_name, password=hashed_password)
        db.session.add(new_admin)
        db.session.commit()
        return make_response(jsonify("Account created successfully"), 201)

api.add_resource(Register, "/register")

class Patients(Resource):
    def get(self):
        patients=Patient.query.all()
        print(patients)
        # return make_response(jsonify(patients), 200)

    def post(self):
        first_name=request.json["first_name"]
        last_name=request.json["last_name"]
        email=request.json["email"]
        phone=request.json["phone"]
        age=request.json["age"]
        gender=request.json["gender"]

        age_validation=Patient().validate_age(age=age, key=age)
        gender_validation=Patient().validate_gender(key=gender, gender=gender)

        if age_validation != age:
            return make_response(jsonify("Age must be a number between 1 and 150"), 400)
        
        elif gender_validation != gender:
            return make_response(jsonify("Gender must be either Male or Female"), 400)
        
        new_patient=Patient(first_name=first_name, last_name=last_name, email=email, phone=phone, age=age, gender=gender)
        db.session.add(new_patient)
        db.session.commit()
        return make_response(jsonify("Patient created successfully"), 201)

api.add_resource(Patients, "/patients")

class Doctors(Resource):
    def  get(self):
        doctors=Doctor.query.all()
        print(doctors)

    def post(self):
        first_name=request.json["first_name"]
        last_name=request.json["last_name"]
        age=request.json["age"]
        gender=request.json["gender"]
        department=request.json["department"]
        experience=request.json["experience"]

        age_validation=Doctor().validate_age(age=age, key=age)
        gender_validation=Doctor().validate_gender(key=gender, gender=gender)
        experience_validation=Doctor().validate_experience(key=experience, experience=experience)

        if age_validation != age:
            return make_response(jsonify("Age must be a number between 1 and 150"), 400)
        
        elif gender_validation != gender:
            return make_response(jsonify("Invalid gender"), 400)

        elif experience_validation != experience:
            return make_response(jsonify("Years of experience must be between 1 and 60"), 400)
        
        new_doctor=Doctor(last_name=last_name, age=age, experience=experience, first_name=first_name, department=department, gender=gender)
        db.session.add(new_doctor)
        db.session.commit()
        return make_response(jsonify("Doctor information saved successfully"), 201)

api.add_resource(Doctors, "/doctors")

class DoctorsByID(Resource):
    def patch(self, id):
        doctor_to_patch=Doctor.query.filter(Doctor.id == id).first()

        if not doctor_to_patch:
            return make_response(jsonify("Doctor could not be found"), 404)

        updated_first_name=request.json["first_name"]
        updated_last_name=request.json["last_name"]
        updated_department=request.json["department"]

        doctor_to_patch.first_name=updated_first_name
        doctor_to_patch.last_name=updated_last_name
        doctor_to_patch.department=updated_department

        db.session.add(doctor_to_patch)
        db.session.commit()
        return make_response(jsonify("Doctor information updated successfully"), 200)

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
        print(appointments)

    def post(self):
        print("Appointment creation")

api.add_resource(Appointments, "/appointments")

if __name__ == "__main__":
    app.run(port=5555, debug=True)