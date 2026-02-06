from django.contrib import admin
from api.models import Board, BoardAction, BoardMember

admin.site.register(Board)
admin.site.register(BoardMember)
admin.site.register(BoardAction)
