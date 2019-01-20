from django.urls import include, path


urlpatterns = [
    path('api/', include('shosetsu.urls')),
    path('', include('frontend.urls')),
]
