from flask import Blueprint
from flask_jwt_extended import current_user, jwt_required
from injector import inject

from app.api.application.services.user_service import UserService
from app.api.domain.models import User
from app.api.presentation.serializers.user_serializer import UserGetResponse

user_module = Blueprint("user", __name__, url_prefix="/users")


@user_module.route("/me")
@inject
@jwt_required()
def get_me(user_service: UserService) -> User:
    user = user_service.find_user_by_id(current_user.id)
    return UserGetResponse(user).data()
