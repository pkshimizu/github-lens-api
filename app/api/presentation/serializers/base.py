from dataclasses import dataclass, asdict
from datetime import datetime

from flask import Request


@dataclass
class BaseRequest:
    def __init__(self, request: Request):
        self.request = request

    def get_str(self, name: str):
        return self.request.json.get(name)


@dataclass
class BaseResponse:
    def __init__(self, status_code: int):
        self.status_code = status_code

    def data(self):
        return asdict(self), self.status_code

    @staticmethod
    def datetime_str(value: datetime | None) -> str | None:
        if value is None:
            return None

        return value.strftime("%Y-%m-%d %H:%M:%S")


@dataclass
class MessageResponse(BaseResponse):
    def __init__(self, message: str, status_code: int = 200):
        super().__init__(status_code)
        self.message = message

    message: str


@dataclass
class ErrorResponse(BaseResponse):
    def __init__(self, message: str, status_code: int):
        super().__init__(status_code)
        self.message = message

    message: str
