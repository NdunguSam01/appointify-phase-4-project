from dotenv import load_dotenv
import os

load_dotenv()

class ApplicationConfig:
    JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS= False
