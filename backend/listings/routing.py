from django.urls import path
from . import consumers

websocket_urlpatterns = [
path('ws/notification/<int:realtor_id>/', consumers.NotificationConsumer.as_asgi()),
# path('ws/chat/<str:room_name>/', consumers.ChatConsumer.as_asgi()),
path('ws/chat/<user_id>/', consumers.MyChatConsumer.as_asgi()),

]