from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

from project import settings
from django.conf.urls.static import static

from registration.urls import registration_urlpatterns
from user.urls import user_urlpatterns, organisation_urlpatterns
from event.urls import event_urlpatterns
from evaluation.urls import evaluation_urlpatterns, rubric_urlpatterns
from contestant_project.urls import contestant_projects_urlpatterns

schema_view = get_schema_view(
    openapi.Info(
        title="JudgeEmAll API",
        default_version='v0.9',
        description="Only god can judge us",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="academy@constructor.org"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,  # Set to False restrict access to protected endpoints
    permission_classes=(permissions.AllowAny,),  # Permissions for docs access
)

urlpatterns = [
    path('backend/admin/', admin.site.urls),
    path('backend/api/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

    path('backend/', include(registration_urlpatterns)),
    path('backend/', include(user_urlpatterns)),
    path('backend/', include(organisation_urlpatterns)),

    path('backend/', include(evaluation_urlpatterns)),
    path('backend/', include(rubric_urlpatterns)),

    path('backend/', include(event_urlpatterns)),
    path('backend/', include(contestant_projects_urlpatterns)),

    path('backend/auth/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('backend/auth/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('backend/auth/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_refresh')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
