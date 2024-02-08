from flask_marshmallow import Schema

class AdminSchema(Schema):
    class Meta:
        fields=('first_name', 'last_name', 'email')

admins_schema=AdminSchema(many=True)
admin_schema=AdminSchema()

class PatientSchema(Schema):
    class Meta:
        fields=("id","first_name","last_name","email","phone","address","gender","blood_group")

patient_schema=PatientSchema()
patients_schema=PatientSchema(many=True)

class DoctorSchema(Schema):
    class Meta:
        fields=("id", "first_name", "last_name", "age", "gender", "department", "experience")

doctors_schema=DoctorSchema(many=True)
doctor_scema=DoctorSchema()