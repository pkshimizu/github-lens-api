from injector import Injector

from app.api.application import ApplicationServiceModule
from app.api.infrastructure.datasources import DataSourceModule
from app.api.infrastructure.externals import ExternalModule

injector = Injector([ApplicationServiceModule(), DataSourceModule(), ExternalModule()])
