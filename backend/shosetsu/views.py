from django.contrib.auth import get_user_model
from rest_framework import viewsets

from . import models, serializers


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = serializers.UserSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = models.Project.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.ProjectListSerializer
        return serializers.ProjectRetrieveSerializer


class BookViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return models.Book.objects.filter(project=self.kwargs['project_pk'])

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.BookListSerializer
        return serializers.BookRetrieveSerializer


class ChapterViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return models.Chapter.objects.filter(book=self.kwargs['book_pk'])

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.ChapterListSerializer
        return serializers.ChapterRetrieveSerializer


class ElementViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return models.Element.objects.filter(project=self.kwargs['project_pk'])

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.ElementListSerializer
        return serializers.ElementRetrieveSerializer


class ElementInstanceViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return models.ElementInstance.objects.filter(
            element=self.kwargs['element_pk']
        )

    serializer_class = serializers.ElementInstanceSerializer


class ElementFieldViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return models.ElementField.objects.filter(
            element=self.kwargs['element_pk']
        )

    serializer_class = serializers.ElementFieldSerializer


class ElementValueViewSet(viewsets.ModelViewSet):
    queryset = models.ElementValue.objects.all()
    serializer_class = serializers.ElementValueSerializer
