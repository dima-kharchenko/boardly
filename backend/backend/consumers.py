from channels.generic.websocket import AsyncWebsocketConsumer

class BoardConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.board_id = self.scope["url_route"]["kwargs"]["board_id"]
        self.group_name = f"board_{self.board_id}"

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()
        print("CONNECTED")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )
        print("DISCONNECTED")

    async def receive(self, text_data):
        print("RECEIVED:", text_data)

        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "broadcast",
                "message": text_data
            }
        )

    async def broadcast(self, event):
        await self.send(text_data=event["message"])
