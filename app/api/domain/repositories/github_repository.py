from abc import ABCMeta, abstractmethod

from app.api.domain.models import GitHubUser


class GitHubRepository(metaclass=ABCMeta):
    @abstractmethod
    def get_access_token(self, code: str) -> str:
        pass

    @abstractmethod
    def get_user(self, access_token: str) -> GitHubUser:
        pass
