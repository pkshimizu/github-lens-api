from dataclasses import dataclass

from flask import Request

from app.api.presentation.serializers.base import BaseRequest, BaseResponse


@dataclass
class SessionPostRequest(BaseRequest):
    def __init__(self, request: Request):
        super().__init__(request)
        self.code = self.get_str("code")

    code: str


@dataclass
class SessionPostResponse(BaseResponse):
    def __init__(self, token: str):
        super().__init__(status_code=201)
        self.token = token

    token: str
