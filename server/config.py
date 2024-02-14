from dotenv import load_dotenv
import os
import redis

load_dotenv()

class ApplicationConfig:
    JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS= False

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://red-cn6f5gdjm4es7393iigg:6379")