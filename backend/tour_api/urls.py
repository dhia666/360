# backend/tour_api/urls.py
from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny
from .views import home  # ✅ Import the home view

# Swagger Schema Configuration
schema_view = get_schema_view(
    openapi.Info(
        title="Virtual Tour API",
        default_version="v1",
        description="API documentation for Ennejma Ezzahra Virtual Tour",
    ),
    public=True,
    permission_classes=(AllowAny,),
)

urlpatterns = [
    path("", home, name="home"),  # ✅ Add root URL
    path("admin/", admin.site.urls),
    path("auth/", include("authentication.urls")),
    path("tour/", include("tour.urls")),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]
