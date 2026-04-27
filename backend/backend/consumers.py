import json

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from api.models import BoardAction, BoardMember


class BoardConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.board_id = self.scope["url_route"]["kwargs"]["board_id"]
        self.group_name = f"board_{self.board_id}"

        user = self.scope["user"]
        is_member = await sync_to_async(
            BoardMember.objects.filter(board_id=self.board_id, user=user).exists
        )()
    
        if not is_member:
            await self.close()
            return

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        temp_id = data.get("tempId")
        saved = await self.create_action(data)

        if not saved:
            return 

        await self.send(text_data=json.dumps({**saved, "tempId": temp_id}))

        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "broadcast",
                "message": json.dumps(saved),
                "sender_channel": self.channel_name,
            }
        )

    async def broadcast(self, event):
        if event.get("sender_channel") != self.channel_name:
            await self.send(text_data=event["message"])

    @sync_to_async
    def create_action(self, data):
        user = self.scope["user"]

        if not BoardMember.objects.filter(board_id=self.board_id, user=user).exists():
            return {}


        action = BoardAction.objects.create(
            board_id=int(self.board_id),
            user=user,
            payload=data["payload"],
            action_type="stroke"
        )

        return {
            "id": action.id,
            "board": action.board_id,
            "user": action.user.id,
            "action_type": action.action_type,
            "payload": action.payload,
        }
