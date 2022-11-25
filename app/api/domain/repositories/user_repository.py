from abc import ABCMeta, abstractmethod

from app.api.domain.models import GitHubUser, User


class UserRepository(metaclass=ABCMeta):
    @abstractmethod
    def save_user(self, github_user: GitHubUser) -> User:
        pass

    @abstractmethod
    def find_user_by_id(self, id: int) -> User:
        pass

    @abstractmethod
    def find_user_by_uid(self, uid: str) -> User:
        pass
