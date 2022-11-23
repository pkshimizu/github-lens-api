from app.api.domain.models import User, GitHubUser
from app.api.domain.repositories.user_repository import UserRepository


class UserAccessor(UserRepository):
    def save_user(self, github_user: GitHubUser) -> User:
        pass

    def find_user(self, uid: str) -> User:
        pass
