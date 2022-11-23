from flask import Blueprint, request
from injector import inject

from app.api.application.services.session_service import SessionService
from app.api.presentation.serializers.session_serializer import (
    SessionPostRequest,
    SessionPostResponse,
)

session_module = Blueprint("session", __name__, url_prefix="/sessions")


@session_module.route("", methods=["POST"])
@inject
def create_session(session_service: SessionService):
    post_request = SessionPostRequest(request)
    token = session_service.sign_in_with_github(code=post_request.code)
    return SessionPostResponse(token=token).data()
