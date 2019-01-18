from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
import re
from rest_framework import serializers
from rest_framework.relations import reverse
from slugify import slugify

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


class ProjectElementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Element
        fields = (
            'id',
            'name'
        )


class ProjectRetrieveSerializer(serializers.ModelSerializer):
    books = ProjectBooksSerializer(
        many=True,
        read_only=True
    )
    elements = ProjectElementsSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = models.Project
        fields = '__all__'


class ProjectListSerializer(serializers.ModelSerializer):
    books_url = serializers.SerializerMethodField()
    elements_url = serializers.SerializerMethodField()

    class Meta:
        model = models.Project
        fields = '__all__'

    def get_books_url(self, obj):
        request = self.context.get('request')
        endpoint = reverse(
            'book-list',
            kwargs={'project_pk': obj.pk},
            request=request)
        return endpoint

    def get_elements_url(self, obj):
        request = self.context.get('request')
        endpoint = reverse(
            'element-list',
            kwargs={'project_pk': obj.pk},
            request=request
        )
        return endpoint


class ProjectSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Project
        fields = '__all__'


class BookChapterListSerializer(serializers.ModelSerializer):
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
        if chapter.content:
            return chapter.content[0:100]
        return ""


class BookRetrieveSerializer(serializers.ModelSerializer):
    project = ProjectSimpleSerializer(read_only=True)
    project_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Project.objects.all(),
        write_only=True
    )
    chapters = BookChapterListSerializer(
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
        else:
            validated_data['project'] = validated_data.pop('project_id')
        return models.Book.objects.create(**validated_data)


class BookListSerializer(serializers.ModelSerializer):
    project = ProjectSimpleSerializer(read_only=True)
    book_url = serializers.SerializerMethodField()

    class Meta:
        model = models.Book
        fields = (
            'id',
            'title',
            'description',
            'book_url',
            'project'
        )

    def get_book_url(self, obj):
        request = self.context.get('request')
        endpoint = reverse(
            'book-detail',
            kwargs={'project_pk': obj.project.pk,
                    'pk': obj.pk},
            request=request
        )
        return endpoint


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
        validated_data['book'] = validated_data.pop('book_id')
        return models.Chapter.objects.create(**validated_data)


class ChapterListSerializer(serializers.ModelSerializer):
    content_preview = serializers.SerializerMethodField()
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Book.objects.all()
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
        if chapter.content:
            return chapter.content[0:100]
        return ""


class ElementsFieldListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ElementField
        fields = (
            'id',
            'label',
            'name',
            'type',
            'details',
            'element_id'
        )


class ElementElementInstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ElementInstance
        fields = (
            'id',
            'name'
        )


class ElementRetrieveSerializer(serializers.ModelSerializer):
    project_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Project.objects.all()
    )
    element_fields = ElementsFieldListSerializer(many=True, read_only=True)

    class Meta:
        model = models.Element
        fields = (
            'id',
            'name',
            'project_id',
            'element_fields'
        )

    def create(self, validated_data):
        validated_data['project'] = validated_data.pop('project_id')
        return models.Element.objects.create(**validated_data)


class ElementListSerializer(serializers.ModelSerializer):
    project_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Project.objects.all()
    )
    instances_url = serializers.SerializerMethodField()
    element_instances = ElementElementInstanceSerializer(
        many=True,
        read_only=True
    )
    fields_url = serializers.SerializerMethodField()

    class Meta:
        model = models.Element
        fields = (
            'id',
            'name',
            'project_id',
            'instances_url',
            'element_instances',
            'fields_url'
        )

    def get_instances_url(self, obj):
        request = self.context.get('request')
        endpoint = reverse(
            'instance-list',
            kwargs={'element_pk': obj.pk, 'project_pk': obj.project.pk},
            request=request
        )
        return endpoint

    def get_fields_url(self, obj):
        request = self.context.get('request')
        endpoint = reverse(
            'field-list',
            kwargs={'element_pk': obj.pk, 'project_pk': obj.project.pk},
            request=request
        )
        return endpoint


class ElementSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Element
        fields = (
            'id',
            'name'
        )


class ElementInstanceSerializer(serializers.ModelSerializer):
    project = ProjectSimpleSerializer(read_only=True)
    project_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Project.objects.all(),
        write_only=True
    )
    element = ElementSimpleSerializer(read_only=True)
    element_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Element.objects.all(),
        write_only=True
    )

    class Meta:
        model = models.ElementInstance
        fields = '__all__'

    def create(self, validated_data):
        validated_data['project'] = validated_data.pop('project_id')
        validated_data['element'] = validated_data.pop('element_id')
        return models.ElementInstance.objects.create(**validated_data)

    def to_representation(self, instance):
        response = super().to_representation(instance)
        element_instance_id = response['id']
        element_id = response['element']['id']
        element_fields = models.ElementField.objects.filter(
            element_id=element_id
        )
        element_values = models.ElementValue.objects.filter(
            element_instance_id=element_instance_id
        )
        field_names = {field.id: field.name for field in element_fields}
        field_values = {value.element_field.id: value.value
                        for value in element_values}
        for k, v in field_names.items():
            response[v] = field_values.get(k, '')
        return response


class ElementFieldSerializer(serializers.ModelSerializer):
    element_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Element.objects.all()
    )

    class Meta:
        model = models.ElementField
        fields = (
            'id',
            'label',
            'name',
            'type',
            'details',
            'element_id'
        )
        read_only_fields = ('name',)

    def create(self, validated_data):
        validated_data['element'] = validated_data.pop('element_id')
        slug_name = slugify(validated_data['label'], ok='_')

        # Check if slug exists as a field name already
        # If it does, increment number after slug
        field_name = slug_name
        while True:
            field = models.ElementField.objects.filter(name=field_name)
            if field.exists():
                field_name = field.first().name
                pattern = r'(.*?)(\d+)$'
                m = re.match(pattern, field_name)
                if m:
                    num = int(m.group(2)) + 1
                else:
                    num = 0
                field_name = f'{slug_name}{num}'
            else:
                validated_data['name'] = field_name
                break

        return models.ElementField.objects.create(**validated_data)


class ElementInstanceSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ElementInstance
        fields = (
            'id',
            'name'
        )


class ElementValueSerializer(serializers.ModelSerializer):
    element_instance = ElementInstanceSimpleSerializer(read_only=True)
    element_instance_id = serializers.PrimaryKeyRelatedField(
        queryset=models.ElementInstance.objects.all(),
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
        validated_data['element_instance'] = validated_data.pop(
            'element_instance_id'
        )
        validated_data['element_field'] = validated_data.pop(
            'element_field_id'
        )
        return models.ElementValue.objects.create(**validated_data)
