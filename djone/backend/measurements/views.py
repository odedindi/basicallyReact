import os
from django.db.models import Q
from rest_framework.generics import  RetrieveUpdateDestroyAPIView, \
    ListCreateAPIView
from measurements.serializers.serializers_basic import MeasurementsSerializerBasic
from rest_framework.response import Response
import csv
from datetime import datetime
from io import StringIO

from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView

from measurements.models import Measurements
from measurements.serializers.serializers_main import MeasurementsSerializer

from django.core.mail import EmailMessage

from visualisations.serializers.serializers_basic import VisualisationSerializerBasic

from django.http import HttpResponse

class ListCreateMeasurements(ListCreateAPIView):
    '''
    get: get a list of all measurements

    .
    post: create new measurements

    .
    '''
    queryset = Measurements.objects.all()
    serializer_class = MeasurementsSerializer


class SearchMeasurements(ListAPIView):
    '''
    get: search measurements at /?search=dvdvd

    .
    '''
    serializer_class = MeasurementsSerializer


    # endpoint: api / measurements /?search=dvdvd
    # search=${search}
    def get_queryset(self):
        search = self.request.query_params.get('search')

        return Measurements.objects.filter(Q(customer__icontains=search) |
                                            Q(site__icontains=search) |
                                            Q(firma__icontains=search) |
                                           Q(date__icontains=search))

class GetUpdateDeleteMeasurements(RetrieveUpdateDestroyAPIView):
    '''
    get: get a list of measurements' data

    .
    put: create data

    .
    patch: update given measurements data

    .
    delete: delete given measurements data

    .
    '''
    queryset = Measurements.objects.all()
    serializer_class = MeasurementsSerializer


class GetCreateMeasurementsBasicData(ListCreateAPIView):
    '''
    get: get a list of all measurements' basic data

    .
    post: create new basic data

    .
    '''
    queryset = Measurements.objects.all()
    serializer_class = MeasurementsSerializerBasic



class GetUpdateDeleteMeasurementsBasicData(RetrieveUpdateDestroyAPIView):
    '''
    get: get a list of measurements' basic data

    .
    put: create data

    .
    patch: update given measurements data

    .
    delete: delete given measurements data

    .
    '''
    queryset = Measurements.objects.all()
    serializer_class = MeasurementsSerializerBasic


class GenerateCSV(RetrieveAPIView):
    '''
    get:  download all measurements data CSV

    .
    '''
    queryset = Measurements.objects.all()
    serializer_class = MeasurementsSerializer

    def get(self, request, *args, **kwargs):
        response = HttpResponse(content_type='text/csv', )
        response['Content-Disposition'] = 'attachment; filename=measurements_data_' + str(datetime.now()) + '.csv'

        writer = csv.writer(response)
        table_fields = []
        for field in Measurements._meta.fields:
            table_fields.append(field.name)
        writer.writerow(table_fields)

        for measurement in Measurements.objects.all().values_list():
            writer.writerow(measurement)

        return response


class GenerateCSVandSend(CreateAPIView):
    '''
    post: send measurements CSV file by email (body: email)

    .
    '''
    serializer_class = VisualisationSerializerBasic

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        perform_create = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        if perform_create.status_code == 200:
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        if perform_create.status_code == 400:
            return Response('Oops! Something went wrong. Please refresh the page and start anew.', status=400,
                            headers=headers)

        if perform_create.status_code == 401:
            return Response('Email sent', status=401, headers=headers)

    def perform_create(self, serializer):
        email = self.request.data["email"]
        csvfile = StringIO()
        writer = csv.writer(csvfile)
        # column names
        table_fields = []
        for field in Measurements._meta.fields:
            table_fields.append(field.name)

        writer.writerow(table_fields)
        # rows
        for measurement in Measurements.objects.all().values_list():
            writer.writerow(measurement)

        message = EmailMessage("Measurements data",
                               "Please find requested data attached. \nHave a nice day!",
                               os.environ.get('DEFAULT_FROM_EMAIL'),
                               [email])
        message.attach('measurements_data_' + str(datetime.now()) + '.csv', csvfile.getvalue(), 'text/csv')
        message.send()
        return Response(status=200)