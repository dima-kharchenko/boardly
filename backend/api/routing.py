from django.urls import re_path
from api.consumers import BoardConsumer

websocket_urlpatterns = [
    re_path(r"ws/board/(?P<board_id>\d+)/$", BoardConsumer.as_asgi()),
]
