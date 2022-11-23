from flask import Blueprint

from app.api.presentation.serializers.system_serializer import HealthCheckResponse

system_module = Blueprint("system", __name__, url_prefix="/system")


@system_module.route("/health")
def health_check() -> None:
    return HealthCheckResponse().data()
