from flask import Blueprint

system_module = Blueprint("system", __name__, url_prefix="/system")


@system_module.route("/health")
def health_check() -> None:
    return "OK"
