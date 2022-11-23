from flask_jwt_extended import create_access_token
from injector import inject

from app.api.domain.repositories.github_repository import GitHubRepository
from app.api.domain.repositories.user_repository import UserRepository


class SessionService:
    @inject
    def __init__(
        self, github_repository: GitHubRepository, user_repository: UserRepository
    ):
        self.github_repository = github_repository
        self.user_repository = user_repository

    def sign_in_with_github(self, code: str) -> str:
        access_token = self.github_repository.get_access_token(code)
        github_user = self.github_repository.get_user(access_token)
        user = self.user_repository.save_user(github_user)
        access_token = create_access_token(identity=user.id)
        return access_token
