from django.contrib.auth import get_user_model
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from . import models, serializers


@api_view(['GET'])
def current_user(request):
    serializer = serializers.UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = serializers.UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

    def list(self, request, *args, **kwargs):
        response = super(BookViewSet, self).list(request, *args, **kwargs)
        project = models.Project.objects.get(id=kwargs['project_pk'])
        response.data = {
            'books': response.data,
            'project': serializers.ProjectNestedSerializer(project).data
        }
        return response


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

    def list(self, request, *args, **kwargs):
        response = super(ElementViewSet, self).list(request, *args, **kwargs)
        project = models.Project.objects.get(id=kwargs['project_pk'])
        response.data = {
            'elements': response.data,
            'project': serializers.ProjectNestedSerializer(project).data
        }
        return response


class ElementInstanceViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return models.ElementInstance.objects.filter(
            element=self.kwargs['element_pk']
        )

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.ElementInstanceListSerializer
        return serializers.ElementInstanceRetrieveSerializer

    def list(self, request, *args, **kwargs):
        response = super(ElementInstanceViewSet, self).list(
            request,
            *args,
            **kwargs
        )
        project = models.Project.objects.get(id=kwargs['project_pk'])
        element = models.Element.objects.get(id=kwargs['element_pk'])
        response.data = {
            'instances': response.data,
            'element': serializers.ElementNestedSerializer(element).data,
            'project': serializers.ProjectNestedSerializer(project).data,
        }
        return response


class ElementFieldViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return models.ElementField.objects.filter(
            element=self.kwargs['element_pk']
        )

    serializer_class = serializers.ElementFieldSerializer


class ElementValueViewSet(viewsets.ModelViewSet):
    queryset = models.ElementValue.objects.all()
    serializer_class = serializers.ElementValueSerializer
