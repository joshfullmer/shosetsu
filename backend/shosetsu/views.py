from django.contrib.auth import get_user_model
from rest_framework import viewsets

from . import models, serializers


# Create your views here.
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
    queryset = models.Book.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.BookListSerializer
        return serializers.BookRetrieveSerializer


class ProjectBooksViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return models.Book.objects.filter(project=self.kwargs['project_pk'])

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.BookListSerializer
        return serializers.BookRetrieveSerializer


class ChapterViewSet(viewsets.ModelViewSet):
    queryset = models.Chapter.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.ChapterListSerializer
        return serializers.ChapterRetrieveSerializer


class ElementTypeViewSet(viewsets.ModelViewSet):
    queryset = models.ElementType.objects.all()
    serializer_class = serializers.ElementTypeSerializer


class ElementViewSet(viewsets.ModelViewSet):
    queryset = models.Element.objects.all()
    serializer_class = serializers.ElementSerializer


class ElementFieldViewSet(viewsets.ModelViewSet):
    queryset = models.ElementField.objects.all()
    serializer_class = serializers.ElementFieldSerializer


class ElementValueViewSet(viewsets.ModelViewSet):
    queryset = models.ElementValue.objects.all()
    serializer_class = serializers.ElementValueSerializer
