from rest_framework import serializers
from django.contrib.auth.models import User
from  .models import Board, BoardMember, BoardAction

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=False,
        min_length=8
    )

    class Meta:
        model = User
        fields = ["username", "password"]

    def validate_username(self, value):
        user = self.instance
        if User.objects.filter(username=value).exclude(id=user.id).exists():
            raise serializers.ValidationError("Username already taken")
        return value

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ("id", "title", "is_public", "created_at", "updated_at")
        read_only_fields = ("id", "created_at")


class BoardMemberSerializer(serializers.ModelSerializer):
    board = BoardSerializer(read_only=True)

    class Meta:
        model = BoardMember
        fields = ("role", "is_favorite", "joined_at", "board")

    def create(self, validated_data):
        if validated_data["role"] == "owner":
            board = validated_data["board"]
            if BoardMember.objects.filter(board=board, role="owner").exists():
                raise serializers.ValidationError({"role": "Board already has an owner"})

        return super().create(validated_data)
        

class BoardActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoardAction
        fields = '__all__'
