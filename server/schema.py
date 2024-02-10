from marshmallow import Schema, fields

class AdminSchema(Schema):
    id=fields.Integer()
    first_name=fields.Str(required=True)
    last_name=fields.Str(required=True)
    email=fields.Email(required=True)

admin_schema=AdminSchema()
admins_schema=AdminSchema(many=True)

class PatientSchema(Schema):
    id=fields.Integer()
    first_name=fields.Str(required=True)
    last_name=fields.Str(required=True)
    email=fields.Email(required=True)
    phone=fields.Str(required=True)
    address=fields.Str(required=True)
    gender=fields.Str(required=True)
    blood_group=fields.Str(required=False)

# patient_schema=PatientSchema()
# patients_schema=PatientSchema(many=True)

class DoctorSchema(Schema):
    id=fields.Integer()
    first_name=fields.Str(required=True)
    last_name=fields.Str(required=True)
    age=fields.Integer(required=True)
    gender=fields.Str(required=True)
    department=fields.Str(required=True)
    experience=fields.Integer(required=True)

# doctor_schema=DoctorSchema()
# doctors_schema=DoctorSchema(many=True)

class AppointmentSchema(Schema):
    id=fields.Integer()
    doctor = fields.Nested(DoctorSchema, allow_none=False)
    patient = fields.Nested(PatientSchema, allow_none=False)
    date = fields.Date(format='%Y-%m-%d' , required=True)
    time=fields.Time(format="%I:%M %p" ,required=True)  
    purpose=fields.Str(required=True) 

# appointment_schema=AppointmentSchema()
# appointments_schema=AppointmentSchema(many=True)