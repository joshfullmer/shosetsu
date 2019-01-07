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
        read_only=True
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
    project = ProjectListSerializer(read_only=True)
    project_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Project.objects.all(),
        write_only=True
    )
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
            'project_id',
            'chapters'
        )

    def create(self, validated_data):
        if self.context['view'].kwargs:
            project_id = self.context['view'].kwargs['project_pk']
            validated_data['project_id'] = project_id
        return models.Book.objects.create(**validated_data)


class BookListSerializer(serializers.ModelSerializer):
    project = ProjectListSerializer(read_only=True)

    class Meta:
        model = models.Book
        fields = (
            'id',
            'title',
            'description',
            'project'
        )


class ChapterRetrieveSerializer(serializers.ModelSerializer):
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Chapter.objects.all()
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


class ChapterListSerializer(serializers.ModelSerializer):
    content_preview = serializers.SerializerMethodField()
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Chapter.objects.all()
    )

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
        fields = (
            'id',
            'label',
            'name',
            'type',
            'details',
            'element_type_id'
        )


class ElementTypeSerializer(serializers.ModelSerializer):
    project_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Project.objects.all()
    )
    element_fields = ElementTypeFieldsSerializer(many=True, read_only=True)

    class Meta:
        model = models.ElementType
        fields = (
            'id',
            'name',
            'project_id',
            'element_fields'
        )


class ElementTypeSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ElementType
        fields = (
            'id',
            'name'
        )


class ElementSerializer(serializers.ModelSerializer):
    project = ProjectListSerializer(read_only=True)
    project_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Project.objects.all(),
        write_only=True
    )
    element_type = ElementTypeSimpleSerializer(read_only=True)
    element_type_id = serializers.PrimaryKeyRelatedField(
        queryset=models.ElementType.objects.all(),
        write_only=True
    )

    class Meta:
        model = models.Element
        fields = '__all__'

    def create(self, validated_data):
        validated_data['project'] = validated_data.pop('project_id')
        validated_data['element_type'] = validated_data.pop('element_type_id')
        return models.Element.objects.create(**validated_data)

    def to_representation(self, instance):
        response = super().to_representation(instance)
        element_id = response['id']
        element_type_id = response['element_type']['id']
        element_fields = models.ElementField.objects.filter(
            element_type_id=element_type_id
        )
        element_values = models.ElementValue.objects.filter(
            element_id=element_id
        )
        field_names = {field.id: field.name for field in element_fields}
        field_values = {value.element_field.id: value.value
                        for value in element_values}
        for k, v in field_names.items():
            response[v] = field_values.get(k, '')
        return response


class ElementFieldSerializer(serializers.ModelSerializer):
    element_type_id = serializers.PrimaryKeyRelatedField(
        queryset=models.ElementType.objects.all()
    )

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

    def create(self, validated_data):
        validated_data['element_type'] = validated_data.pop('element_type_id')
        return models.ElementField.objects.create(**validated_data)


class ElementSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Element
        fields = (
            'id',
            'name'
        )


class ElementValueSerializer(serializers.ModelSerializer):
    element = ElementSimpleSerializer(read_only=True)
    element_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Element.objects.all(),
        write_only=True
    )

    element_field = ElementFieldSerializer(read_only=True)
    element_field_id = serializers.PrimaryKeyRelatedField(
        queryset=models.ElementField.objects.all(),
        write_only=True
    )

    class Meta:
        model = models.ElementValue
        fields = '__all__'

    def create(self, validated_data):
        validated_data['element'] = validated_data.pop('element_id')
        validated_data['element_field'] = validated_data.pop(
            'element_field_id'
        )
        return models.ElementValue.objects.create(**validated_data)
