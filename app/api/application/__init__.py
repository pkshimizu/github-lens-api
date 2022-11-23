from injector import Module, Binder

from app.api.application.services.system_service import SystemService


class ApplicationServiceModule(Module):
    def configure(self, binder: Binder) -> None:
        binder.bind(SystemService, to=SystemService())
        pass
