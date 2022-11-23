from flask import Flask, Blueprint
from flask_injector import FlaskInjector

from app.api.application import ApplicationServiceModule
from app.api.presentation.controllers.system_controller import system_module

app = Flask(__name__)

FlaskInjector(app=app, modules=[ApplicationServiceModule])

v1_modules = Blueprint("v1", __name__, url_prefix="/v1")
v1_modules.register_blueprint(system_module)

app.register_blueprint(v1_modules)


@app.route("/")
def index():
    return "OK"
