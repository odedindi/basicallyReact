

from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView

from map.models import Map
from map.serializers import MapSerializer
from measurements.models import Measurements


class ListMaps(ListAPIView):
    '''
    get: get all maps

    .
    '''
    queryset = Map.objects.all()
    serializer_class = MapSerializer


class CreateMapOnMeasurement(CreateAPIView):
    '''
    post: create new map on measurement

    .
    '''
    queryset = Measurements.objects.all()
    serializer_class = MapSerializer
    lookup_url_kwarg = 'measurements_id'
    lookup_field = 'id'

class CreateMap(CreateAPIView):
    '''
    post: create new map 

    .
    '''
    queryset = Measurements.objects.all()
    serializer_class = MapSerializer
   


class GetUpdateDeleteMap(RetrieveUpdateDestroyAPIView):
    '''
    get: get a list of given map

    .
    put: create data

    .
    patch: update given map

    .
    delete: delete given map

    .
    '''
    queryset = Map.objects.all()
    serializer_class = MapSerializer

