from django.contrib import admin
from django.urls import include, path
from rest_framework_nested import routers
from rest_framework_jwt.views import obtain_jwt_token

from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'project', views.ProjectViewSet)
router.register(r'element-value', views.ElementValueViewSet)

project_router = routers.NestedDefaultRouter(
    router,
    r'project',
    lookup='project'
)
project_router.register(
    r'book',
    views.BookViewSet,
    base_name='book'
)
project_router.register(
    r'element',
    views.ElementViewSet,
    base_name='element'
)

book_router = routers.NestedDefaultRouter(
    project_router,
    r'book',
    lookup='book'
)
book_router.register(
    r'chapter',
    views.ChapterViewSet,
    base_name='chapter'
)

element_router = routers.NestedDefaultRouter(
    project_router,
    r'element',
    lookup='element'
)
element_router.register(
    r'instance',
    views.ElementInstanceViewSet,
    base_name='instance'
)
element_router.register(
    r'field',
    views.ElementFieldViewSet,
    base_name='field'
)

urlpatterns = [
    path('', include(router.urls)),
    path('', include(project_router.urls)),
    path('', include(book_router.urls)),
    path('', include(element_router.urls)),
    path('admin/', admin.site.urls),
    path('auth/', obtain_jwt_token),
    path('user/current/', views.current_user),
    path('user/', views.UserList.as_view()),
]
