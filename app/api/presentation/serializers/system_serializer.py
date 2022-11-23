from dataclasses import dataclass

from app.api.presentation.serializers.base import BaseResponse


@dataclass
class HealthCheckResponse(BaseResponse):
    def __init__(self):
        super().__init__(200)
        self.result = "OK"

    result: str
