from flask import Flask
from flask_injector import FlaskInjector

from app.api.application import ApplicationServiceModule
from app.api.infrastructure.datasources import DataSourceModule
from app.api.infrastructure.externals import ExternalModule


def setup_injector(app: Flask):
    FlaskInjector(
        app=app, modules=[ApplicationServiceModule, DataSourceModule, ExternalModule]
    )
