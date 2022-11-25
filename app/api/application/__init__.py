from injector import Module, Binder

from app.api.application.services.session_service import SessionService
from app.api.application.services.system_service import SystemService
from app.api.application.services.user_service import UserService


class ApplicationServiceModule(Module):
    def configure(self, binder: Binder) -> None:
        binder.bind(SystemService, to=SystemService)
        binder.bind(SessionService, to=SessionService)
        binder.bind(UserService, to=UserService)
