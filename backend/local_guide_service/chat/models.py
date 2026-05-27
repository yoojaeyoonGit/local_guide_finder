from django.db import models
from accounts.models import User
from matches.models import MatchRequest


class ChatRoom(models.Model):
    traveler = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chat_rooms_as_traveler")
    guide = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chat_rooms_as_guide")
    match_request = models.OneToOneField(MatchRequest, on_delete=models.CASCADE, related_name="chat_room")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "chat_rooms"

    def __str__(self):
        return f"Room: {self.traveler.name} <> {self.guide.name}"


class Message(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_messages")
    message_content = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "messages"
        ordering = ["created_at"]

    def __str__(self):
        return f"[{self.room_id}] {self.sender.name}: {self.message_content[:30]}"


class MessageAttachment(models.Model):
    message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name="attachments")
    file_url = models.CharField(max_length=500)
    file_type = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "message_attachments"
