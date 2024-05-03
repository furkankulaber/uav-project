from rest_framework.response import Response


class CustomResponse(Response):
    def __init__(self, message="", data=None, status_code=None, **kwargs):
        data = {'status_code': status_code, 'message': message, 'data': data}
        super().__init__(data, **kwargs)