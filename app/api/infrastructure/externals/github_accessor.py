from app.api.domain.models import GitHubUser
from app.api.domain.repositories.github_repository import GitHubRepository


class GitHubAccessor(GitHubRepository):
    def get_access_token(self, code: str) -> str:
        pass

    def get_user(self, access_token: str) -> GitHubUser:
        pass
