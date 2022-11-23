from injector import Module, Binder

from app.api.domain.repositories.github_repository import GitHubRepository
from app.api.infrastructure.externals.github_accessor import GitHubAccessor


class ExternalModule(Module):
    def configure(self, binder: Binder) -> None:
        binder.bind(GitHubRepository, to=GitHubAccessor)
