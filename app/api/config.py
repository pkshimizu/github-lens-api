from flask import Flask

from app.api.env.local import database


def load_config(app: Flask):
    app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = f"mysql://{database['username']}:{database['password']}@{database['host']}:{database['port']}/{database['name']}?charset=utf8"
