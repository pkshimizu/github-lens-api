from dataclasses import dataclass
from datetime import datetime


@dataclass
class GitHubUser:
    login: str
    avatar_url: str
    name: str
    email: str
    created_at: datetime
    updated_at: datetime


@dataclass
class User:
    id: int
    uid: str
    name: str
    email: str
    github_login_id: str
    avatar_url: str
    created_at: datetime
    updated_at: datetime
