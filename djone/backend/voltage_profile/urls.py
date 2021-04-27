from django.urls import path

from voltage_profile.views import ListVoltageProfiles, CreateVoltageProfile, \
    GetUpdateDeleteVoltageProfile, GenerateCSVandSendVP, GenerateCSV

urlpatterns = [

    path('list', ListVoltageProfiles.as_view()),
    path('new', CreateVoltageProfile.as_view()),
    path('update/<int:pk>', GetUpdateDeleteVoltageProfile.as_view()),
    path('email.csv', GenerateCSVandSendVP.as_view()),
    path('download.csv', GenerateCSV.as_view()),
]
