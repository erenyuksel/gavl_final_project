from django.urls import path
from .views import CsvImportAPIView

upload_csv_urlpatterns = [
    path('upload-csv/', CsvImportAPIView.as_view(), name='upload_csv'),
]
