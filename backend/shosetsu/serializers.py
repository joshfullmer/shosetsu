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


class ProjectBooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Book
        fields = ('id', 'title', 'description')


class ProjectRetrieveSerializer(serializers.ModelSerializer):
    books = ProjectBooksSerializer(
        many=True,
        read_only=True,
        source='book_set'
    )

    class Meta:
        model = models.Project
        fields = '__all__'


class ProjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Project
        fields = '__all__'


class BookChaptersSerializer(serializers.ModelSerializer):
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
    project = ProjectListSerializer()
    chapters = BookChaptersSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = models.Book
        fields = (
            'id',
            'title',
            'description',
            'project',
            'chapters'
        )

    def create(self, validated_data):
        if self.context['view'].kwargs:
            project_id = self.context['view'].kwargs['project_pk']
            validated_data['project_id'] = project_id
        return models.Book.objects.create(**validated_data)


class BookListSerializer(serializers.ModelSerializer):
    project = ProjectListSerializer()

    class Meta:
        model = models.Book
        fields = (
            'id',
            'title',
            'description',
            'project'
        )


class ChapterRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = (
            'id',
            'title',
            'content',
            'notes',
            'book_id'
        )


class ChapterListSerializer(serializers.ModelSerializer):
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


class ElementTypeFieldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ElementField
        fields = '__all__'


class ElementTypeSerializer(serializers.ModelSerializer):
    element_fields = ElementTypeFieldsSerializer(many=True, read_only=True)

    class Meta:
        model = models.ElementType
        fields = (
            'id',
            'name',
            'project_id',
            'element_fields'
        )


class ElementSerializer(serializers.ModelSerializer):
    project = ProjectListSerializer()
    element_type = ElementTypeSerializer()

    class Meta:
        model = models.Element
        fields = '__all__'


class ElementFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ElementField
        fields = (
            'id',
            'label',
            'name',
            'type',
            'details',
            'element_type_id'
        )


class ElementValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ElementValue
        fields = '__all__'
