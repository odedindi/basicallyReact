from django.urls import path
from measurements.views import GetUpdateDeleteMeasurements, \
    GetUpdateDeleteMeasurementsBasicData, GetCreateMeasurementsBasicData, ListCreateMeasurements, SearchMeasurements, \
    GenerateCSVandSend, GenerateCSV

urlpatterns = [

    path('', ListCreateMeasurements.as_view()),
    path('update/<int:pk>', GetUpdateDeleteMeasurements.as_view()),
    path('basicdata/', GetCreateMeasurementsBasicData.as_view()),
    path('basicdata/<int:pk>', GetUpdateDeleteMeasurementsBasicData.as_view()),
    path('search/', SearchMeasurements.as_view()),
    path('email.csv', GenerateCSVandSend.as_view()),
    path('download.csv', GenerateCSV.as_view()),


]
