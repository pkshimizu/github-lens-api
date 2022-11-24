import requests
from flask import current_app
from github import Github

from app.api.domain.models import GitHubUser
from app.api.domain.repositories.github_repository import GitHubRepository


class GitHubAccessor(GitHubRepository):
    def get_access_token(self, code: str) -> str:
        response = requests.post(
            "https://github.com/login/oauth/access_token",
            json={
                "code": code,
                "client_id": current_app.config["GITHUB_CLIENT_ID"],
                "client_secret": current_app.config["GITHUB_CLIENT_SECRET"],
            },
            headers={"Accept": "application/json"},
        )
        return response.json()["access_token"]

    def get_user(self, access_token: str) -> GitHubUser:
        github_client = Github(access_token)
        user = github_client.get_user()
        return GitHubUser(
            login=user.login,
            avatar_url=user.avatar_url,
            name=user.name,
            email=user.email,
            created_at=user.created_at,
            updated_at=user.updated_at,
        )
