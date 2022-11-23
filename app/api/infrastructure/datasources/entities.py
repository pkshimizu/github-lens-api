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
