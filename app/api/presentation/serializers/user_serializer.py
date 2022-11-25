from dataclasses import dataclass

from app.api.domain.models import User
from app.api.presentation.serializers.base import BaseResponse


@dataclass
class UserGetResponse(BaseResponse):
    def __init__(self, user: User):
        super().__init__(200)
        self.uid = user.uid
        self.name = user.name
        self.email = user.email
        self.github_login_id = user.github_login_id
        self.avatar_url = user.avatar_url
        self.created_at = self.datetime_str(user.created_at)

    uid: str
    name: str
    email: str
    github_login_id: str
    avatar_url: str
    created_at: str
