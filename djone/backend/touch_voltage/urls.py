from django.urls import path


from touch_voltage.views import CreateTouchVoltage, ListTouchVoltages, GetUpdateDeleteTouchVoltage, \
    GenerateCSVandSendTV, GenerateCSV

urlpatterns = [

    path('list', ListTouchVoltages.as_view()),
    path('new', CreateTouchVoltage.as_view()),
    path('update/<int:pk>', GetUpdateDeleteTouchVoltage.as_view()),
    path('email.csv', GenerateCSVandSendTV.as_view()),
    path('download.csv', GenerateCSV.as_view()),
]
