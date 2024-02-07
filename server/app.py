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


if __name__ == "__main__":
    app.run(port=5555, debug=True)