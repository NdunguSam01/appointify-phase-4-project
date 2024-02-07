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

if __name__ == "__main__":
    app.run(port=5555, debug=True)