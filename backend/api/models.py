from django.db import models
from django.contrib.auth.models import User
from django.db.models import Q



class Board(models.Model):
    title = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owned_boards")
    is_public = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ("title", "owner")


class BoardMember(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name="members")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="board_memberships")
    role = models.CharField(max_length=20, choices={"owner": "owner", "editor": "editor", "viewer": "viewer"})
    is_favorite = models.BooleanField(default=False)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("board", "user")
        constraints = [
            models.UniqueConstraint(
                fields=["board"],
                condition=Q(role="owner"),
                name="unique_owner_per_board"
            )
        ]


class BoardAction(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action_type = models.CharField(max_length=20)
    payload = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=["board", "created_at"]),]

