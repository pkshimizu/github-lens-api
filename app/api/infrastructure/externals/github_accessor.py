from flask import current_app
from github import Github
from github.ApplicationOAuth import ApplicationOAuth

from app.api.domain.models import GitHubUser
from app.api.domain.repositories.github_repository import GitHubRepository


class GitHubAccessor(GitHubRepository):
    def get_access_token(self, code: str) -> str:
        github = Github(
            client_id=current_app.config["GITHUB_CLIENT_ID"],
            client_secret=current_app.config["GITHUB_CLIENT_SECRET"],
        )
        access_token = ApplicationOAuth().get_access_token(code=code, state=None)
        return access_token.token

    def get_user(self, access_token: str) -> GitHubUser:
        github = Github(access_token)
        user = github.get_user()
        return GitHubUser(
            login=user.login,
            avatar_url=user.avatar_url,
            name=user.name,
            email=user.email,
            created_at=user.created_at,
            updated_at=user.updated_at,
        )
