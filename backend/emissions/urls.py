from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    health,
    upload_data,
    dashboard,
    suspicious,
    TenantViewSet,
    DataSourceViewSet,
    EmissionRecordViewSet,
    AuditLogViewSet
)

router = DefaultRouter()

router.register(r'tenants', TenantViewSet)
router.register(r'datasources', DataSourceViewSet)
router.register(r'emissions', EmissionRecordViewSet)
router.register(r'auditlogs', AuditLogViewSet)

urlpatterns = [
    path('health/', health),
    path('upload/', upload_data),
    path('dashboard/', dashboard),
    path('suspicious/', suspicious),
    path('', include(router.urls)),
]