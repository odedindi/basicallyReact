from django.urls import path

from map.views import ListMaps, CreateMap, GetUpdateDeleteMap, CreateMapOnMeasurement

urlpatterns = [

    path('list', ListMaps.as_view()),
    path('new/<int:measurement_id>', CreateMapOnMeasurement.as_view()),
    path('new', CreateMap.as_view()),
    path('update/<int:pk>', GetUpdateDeleteMap.as_view()),

]
