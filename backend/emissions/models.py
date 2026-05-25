from django.db import models


class Tenant(models.Model):
    company_name = models.CharField(max_length=100)
    industry = models.CharField(max_length=100)

    def __str__(self):
        return self.company_name


class DataSource(models.Model):
    SOURCE_CHOICES = [
        ('SAP','SAP'),
        ('UTILITY','UTILITY'),
        ('TRAVEL','TRAVEL')
    ]

    source_type=models.CharField(
        max_length=20,
        choices=SOURCE_CHOICES
    )

    ingestion_method=models.CharField(max_length=100)
    upload_time=models.DateTimeField(auto_now_add=True)


class EmissionRecord(models.Model):
    category=models.CharField(max_length=100)
    scope=models.CharField(max_length=20)
    quantity=models.FloatField()
    normalized_unit=models.CharField(max_length=50)
    original_unit=models.CharField(max_length=50)
    emission_value=models.FloatField()
    status=models.CharField(max_length=20)


class AuditLog(models.Model):
    action=models.CharField(max_length=100)
    previous_value=models.TextField()
    updated_value=models.TextField()
    modified_by=models.CharField(max_length=100)
    timestamp=models.DateTimeField(auto_now_add=True)