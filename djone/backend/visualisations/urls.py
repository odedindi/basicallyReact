from django.urls import path


from visualisations.views import ListVisualisation, UpdateVisualisation, CreateVisualisation, \
GeneratePDFandSend, GeneratePDF

urlpatterns = [

    path('list', ListVisualisation.as_view()),
    path('new', CreateVisualisation.as_view()),
    path('update/<int:pk>', UpdateVisualisation.as_view()),

    path('email.pdf/<int:pk>', GeneratePDFandSend.as_view()),
    path('download.pdf/<int:pk>', GeneratePDF.as_view()),

]
