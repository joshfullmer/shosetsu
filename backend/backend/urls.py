"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework_nested import routers

from shosetsu import views

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
    path('api-auth/', include('rest_framework.urls'))
]
