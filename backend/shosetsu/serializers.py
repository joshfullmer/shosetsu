from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import serializers

from . import models


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = get_user_model().objects.create(
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = '__all__'


class ProjectBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Book
        fields = ('id', 'title', 'description')


class ProjectRetrieveSerializer(serializers.ModelSerializer):
    books = ProjectBookSerializer(many=True, read_only=True, source='book_set')

    class Meta:
        model = models.Project
        fields = '__all__'


class ProjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Project
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    project_title = serializers.SerializerMethodField()
    project_id = serializers.IntegerField(source='project.id')

    class Meta:
        model = models.Book
        fields = (
            'id',
            'title',
            'description',
            'project_id',
            'project_title'
        )

    def get_project_title(self, obj):
        project = get_object_or_404(models.Project, pk=obj.project.id)
        return project.title
