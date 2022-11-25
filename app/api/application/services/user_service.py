from injector import inject

from app.api.domain.models import User
from app.api.domain.repositories.user_repository import UserRepository


class UserService:
    @inject
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def find_user_by_id(self, id: int) -> User | None:
        return self.user_repository.find_user_by_id(id)

    def find_user_by_uid(self, uid: str) -> User | None:
        return self.user_repository.find_user_by_uid(uid)
