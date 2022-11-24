from app.api.database import db
from app.api.domain.models import User, GitHubUser
from app.api.domain.repositories.user_repository import UserRepository
from app.api.infrastructure.datasources.entities import UserEntity


class UserAccessor(UserRepository):
    def save_user(self, github_user: GitHubUser) -> User:
        user_entity = UserEntity()
        user_entity.name = github_user.name
        user_entity.email = github_user.email
        user_entity.github_login_id = github_user.login
        user_entity.avatar_url = github_user.avatar_url
        db.session.add(user_entity)
        db.session.commit()
        return User(
            id=user_entity.id,
            uid=user_entity.uid,
            name=user_entity.name,
            email=user_entity.email,
            github_login_id=user_entity.github_login_id,
            avatar_url=user_entity.avatar_url,
            created_at=user_entity.created_at,
            updated_at=user_entity.updated_at,
        )

    def find_user(self, uid: str) -> User:
        pass
