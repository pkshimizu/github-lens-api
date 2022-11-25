from flask import Flask, Blueprint
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from app.api.application.errors import ValidationError, AuthenticationError
from app.api.config import load_config
from app.api.database import setup_db
from app.api.domain.models import User
from app.api.infrastructure.datasources.entities import UserEntity
from app.api.injector import setup_injector
from app.api.presentation.controllers.session_controller import session_module
from app.api.presentation.controllers.system_controller import system_module
from app.api.presentation.controllers.user_controller import user_module
from app.api.presentation.serializers.base import ErrorResponse, CurrentUser

app = Flask(__name__)

CORS(app)

load_config(app)

v1_modules = Blueprint("v1", __name__, url_prefix="/v1")
v1_modules.register_blueprint(system_module)
v1_modules.register_blueprint(session_module)
v1_modules.register_blueprint(user_module)

v1_modules.errorhandler(ValidationError)


@v1_modules.errorhandler(ValidationError)
def handle_validation_error(e: ValidationError):
    return ErrorResponse(str(e), 400).data()


@v1_modules.errorhandler(AuthenticationError)
def handle_authentication_error(e: AuthenticationError):
    return ErrorResponse(str(e), 401).data()


@v1_modules.errorhandler(Exception)
def handle_exception(e: Exception):
    app.logger.error(e)
    return ErrorResponse(str(e), 500).data()


app.register_blueprint(v1_modules)

setup_db(app)

jwt = JWTManager()
jwt.init_app(app)


@jwt.user_identity_loader
def identity_loader(user: User):
    return CurrentUser(user.id, user.uid)


@jwt.user_lookup_loader
def lookup_user(_jwt_header, jwt_data):
    json = jwt_data["sub"]
    return CurrentUser(json["id"], json["uid"])


setup_injector(app)
