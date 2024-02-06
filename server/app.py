from flask import Flask
from flask_restful import Api, Resource
from flask_migrate import Migrate
from models import db, Admin, Patient, Doctor, Appointment

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
        return "<h1>Main Page</h1>"
    
api.add_resource(Index, "/")


if __name__ == "__main__":
    app.run(port=5555, debug=True)