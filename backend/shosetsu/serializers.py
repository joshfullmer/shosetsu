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


class BookChapterSerializer(serializers.ModelSerializer):
    content_preview = serializers.SerializerMethodField()

    class Meta:
        model = models.Chapter
        fields = (
            'id',
            'title',
            'content_preview',
        )

    def get_content_preview(self, obj):
        chapter = get_object_or_404(models.Chapter, pk=obj.id)
        return chapter.content[0:100]


class BookRetrieveSerializer(serializers.ModelSerializer):
    project_title = serializers.SerializerMethodField()
    chapters = BookChapterSerializer(
        many=True,
        read_only=True,
        source='chapter_set'
    )

    class Meta:
        model = models.Book
        fields = (
            'id',
            'title',
            'description',
            'project_id',
            'project_title',
            'chapters'
        )

    def create(self, validated_data):
        validated_data['project_id'] = validated_data['project_id'].id
        return models.Book.objects.create(**validated_data)

    def get_project_title(self, obj):
        project = get_object_or_404(models.Project, pk=obj.project.id)
        return project.title


class BookListSerializer(serializers.ModelSerializer):
    project_title = serializers.SerializerMethodField()
    project_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Project.objects.all()
    )

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


class ChapterRetrieveSerializer(serializers.ModelSerializer):
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Book.objects.all()
    )

    class Meta:
        model = models.Chapter
        fields = (
            'id',
            'title',
            'content',
            'notes',
            'book_id'
        )

    def create(self, validated_data):
        validated_data['book_id'] = validated_data['book_id'].id
        return models.Chapter.objects.create(**validated_data)


class ChapterListSerializer(serializers.ModelSerializer):
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Book.objects.all()
    )
    content_preview = serializers.SerializerMethodField()

    class Meta:
        model = models.Chapter
        fields = (
            'id',
            'title',
            'content_preview',
            'book_id'
        )

    def get_content_preview(self, obj):
        chapter = get_object_or_404(models.Chapter, pk=obj.id)
        return chapter.content[0:100]
