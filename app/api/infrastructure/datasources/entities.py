from datetime import datetime

import shortuuid as shortuuid

from app.api.database import db


class BaseEntity:
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False
    )
    deleted_at = db.Column(db.DateTime)


def generate_uid():
    return shortuuid.uuid()


class UidEntity(BaseEntity):
    uid = db.Column(db.String(32), default=generate_uid)


class UserEntity(db.Model, UidEntity):
    __tablename__ = "user"

    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    github_login_id = db.Column(db.String(255), nullable=False)
    avatar_url = db.Column(db.String(255), nullable=False)


class GitHubOrganizationEntity(db.Model, BaseEntity):
    __tablename__ = "github_organization"

    login_id = db.Column(db.String(255), nullable=False)
    avatar_url = db.Column(db.String(255), nullable=False)
    description: db.Column(db.Text, nullable=True)


class GitHubRepositoryEntity(db.Model, BaseEntity):
    __tablename__ = "github_repository"

    name = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(255), nullable=False)
    owner_login_id = db.Column(db.String(255), nullable=False)
    private = db.Column(db.Boolean, nullable=False)
    description: db.Column(db.Text, nullable=True)
    avatar_url = db.Column(db.String(255), nullable=False)
