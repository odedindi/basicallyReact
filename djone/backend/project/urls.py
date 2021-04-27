"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_simplejwt import views as jwt_views

schema_view = get_schema_view(
    openapi.Info(
        title="Axpo's Grounding Measurements",
        default_version='v0.1',
        description="Description of the APIs",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="learn@propulsionacademy.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,  # Set to False restrict access to protected endpoints
    permission_classes=(permissions.AllowAny,),  # Permissions for docs access
)

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/users/', include('user.urls')),
    path('api/measurements/', include('measurements.urls')),
    path('api/visualisations/', include('visualisations.urls')),
    path('api/touchvoltage/', include('touch_voltage.urls')),
    path('api/voltageprofile/', include('voltage_profile.urls')),
    path('api/map/', include('map.urls')),

    path('api/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

    path('api/auth/token/', jwt_views.TokenObtainPairView.as_view()),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view()),
    path('token/verify/', jwt_views.TokenVerifyView.as_view()),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
