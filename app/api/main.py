from flask import Flask, Blueprint
from flask_injector import FlaskInjector

from app.api.application import ApplicationServiceModule
from app.api.application.errors import ValidationError, AuthenticationError
from app.api.presentation.controllers.system_controller import system_module
from app.api.presentation.serializers.base import ErrorResponse

app = Flask(__name__)

FlaskInjector(app=app, modules=[ApplicationServiceModule])

v1_modules = Blueprint("v1", __name__, url_prefix="/v1")
v1_modules.register_blueprint(system_module)

v1_modules.errorhandler(ValidationError)


@v1_modules.errorhandler(ValidationError)
def handle_validation_error(e: ValidationError):
    return ErrorResponse(str(e), 400).data()


@v1_modules.errorhandler(AuthenticationError)
def handle_authentication_error(e: AuthenticationError):
    return ErrorResponse(str(e), 401).data()


@v1_modules.errorhandler(Exception)
def handle_exception(e: Exception):
    return ErrorResponse(str(e), 500).data()


app.register_blueprint(v1_modules)
