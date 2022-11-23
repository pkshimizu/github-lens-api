from injector import Module, Binder

from app.api.domain.repositories.user_repository import UserRepository
from app.api.infrastructure.datasources.user_accessor import UserAccessor


class DataSourceModule(Module):
    def configure(self, binder: Binder) -> None:
        binder.bind(UserRepository, to=UserAccessor)
