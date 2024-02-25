import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.generic.websocket import WebsocketConsumer
from accounts.models import UserAccount
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from asgiref.sync import async_to_sync
from .models import ChatMessage
from .serializers import MessageSerializer

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.realtor_id = self.scope['url_route']['kwargs']['realtor_id']
        realtor = await self.get_realtor_instance()

        if realtor:
            self.room_group_name = f"notify_{realtor.id}" 
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()
            await self.send(text_data=json.dumps({
                'message': 'connected',
            }))

        else:
            await self.close()

    async def get_realtor_instance(self):
        try:
            return await database_sync_to_async(UserAccount.objects.get)(id=self.realtor_id)
        except UserAccount.DoesNotExist:
            return None
    
            

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        await self.send(text_data=json.dumps({'status': 'OK'}))

    async def send_notification(self, event):
        data = json.loads(event.get('value'))
        await self.send(text_data=json.dumps({
                'type' : 'notification',
                'payload': data,
                'notification_count': len(data),
            }))
        
    async def logout_user(self, event):
        await self.send(text_data=json.dumps({
            'type': 'logout'
        }))
        

 
class MyChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.room_group_name = f'my_inbox_{self.user_id}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Save message to database
        sender_id = text_data_json['sender_id']
        receiver_id = text_data_json['receiver_id']
        
       
        
        # Use sync_to_async for database operations
        sender = await sync_to_async(UserAccount.objects.get)(id=sender_id)
        reciever = await sync_to_async(UserAccount.objects.get)(id=receiver_id)
        
        
        # Create chat message asynchronously
        chat_message = await sync_to_async(ChatMessage.objects.create)(
            sender=sender,
            reciever=reciever,
            message=message
        )
        
        # Serialize message
        serializer = MessageSerializer(chat_message)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': serializer.data
            }
        )

    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
        
        
        # Retrieve UserAccount instances
        # sender = UserAccount.objects.get(id=sender_id)
        # receiver = UserAccount.objects.get(id=receiver_id)
        
        # chat_message = ChatMessage.objects.create(
        #     sender=sender,
        #     receiver=receiver,
        #     message=message
        # )
        # chat_message.save()