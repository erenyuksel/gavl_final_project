# # views.py
# import csv
# from django.shortcuts import render
# from django.http import JsonResponse
# from .forms import CSVUploadForm
# from event.models import Event
#
#
# def upload_csv(request):
#     if request.method == 'POST':
#         form = CSVUploadForm(request.POST, request.FILES)
#         if form.is_valid():
#             csv_file = request.FILES['csv_file']
#             # Assuming the CSV file has a header row
#             reader = csv.DictReader(csv_file)
#             for row in reader:
#                 # Create objects based on CSV data
#                 Event.objects.create(
#                     name=row['name'],
#                     description=row['description'],
#                     # Add other fields as needed
#                 )
#             return JsonResponse({'message': 'CSV file uploaded successfully'}, status=201)
#         else:
#             return JsonResponse({'errors': form.errors}, status=400)
#     else:
#         return JsonResponse({'message': 'This endpoint only accepts POST requests'}, status=405)
