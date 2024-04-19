from django.db import models


class CsvImporter(models.Model):
    file_name = models.FileField(upload_to='importer')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"File id: {self.id}"
