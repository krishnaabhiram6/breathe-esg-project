from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets

from .models import Tenant, DataSource, EmissionRecord, AuditLog
from .serializers import (
    TenantSerializer,
    DataSourceSerializer,
    EmissionRecordSerializer,
    AuditLogSerializer
)


@api_view(['GET'])
def health(request):
    return Response({
        "status": "ok"
    })


class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer


class DataSourceViewSet(viewsets.ModelViewSet):
    queryset = DataSource.objects.all()
    serializer_class = DataSourceSerializer


class EmissionRecordViewSet(viewsets.ModelViewSet):
    queryset = EmissionRecord.objects.all()
    serializer_class = EmissionRecordSerializer


class AuditLogViewSet(viewsets.ModelViewSet):
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer


@api_view(['POST'])
def upload_data(request):

    source = request.data.get("source")

    if source == "SAP":
        return Response({
            "message": "SAP fuel/procurement data received",
            "status": "success"
        })

    elif source == "UTILITY":
        return Response({
            "message": "Electricity data received",
            "status": "success"
        })

    elif source == "TRAVEL":
        return Response({
            "message": "Travel data received",
            "status": "success"
        })

    return Response({
        "message": "Unknown source"
    })


@api_view(['GET'])
def dashboard(request):

    total_records = EmissionRecord.objects.count()

    pending = EmissionRecord.objects.filter(
        status="Pending"
    ).count()

    approved = EmissionRecord.objects.filter(
        status="Approved"
    ).count()

    return Response({
        "total_records": total_records,
        "pending_records": pending,
        "approved_records": approved
    })


@api_view(['GET'])
def suspicious(request):

    suspicious_records = EmissionRecord.objects.filter(
        quantity__gt=1000
    )

    serializer = EmissionRecordSerializer(
        suspicious_records,
        many=True
    )

    return Response(serializer.data)