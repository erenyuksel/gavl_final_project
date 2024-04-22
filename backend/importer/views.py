# views.py
import csv
import json
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from importer.models import CsvImporter

class CsvImportAPIView(generics.ListAPIView):
    def post(self, request, *args, **kwargs):
        # Access files directly from request.FILES
        for file_obj in request.FILES.values():
            # Check if the file is a CSV file
            if file_obj.content_type == 'text/csv':
                # Read the CSV file
                reader = csv.DictReader(file_obj)

                # Convert CSV data to JSON
                data = [row for row in reader]

                # Store CSV data in the database
                dynamic_csv = CsvImporter(csv_data=json.dumps(data))
                dynamic_csv.save()

        return Response({'message': 'CSV files processed successfully'}, status=status.HTTP_200_OK)
