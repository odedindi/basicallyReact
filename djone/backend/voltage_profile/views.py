import csv
from datetime import datetime
from io import StringIO

import os
from django.core.mail import EmailMessage
from django.http import HttpResponse
from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework.response import Response

from visualisations.serializers.serializers_basic import VisualisationSerializerBasic
from voltage_profile.models import VoltageProfile
from voltage_profile.serializers.serializers import VoltageProfileSerializer


class ListVoltageProfiles(ListAPIView):
    '''
    get: get a list of voltage profiles

    .
    '''
    queryset = VoltageProfile.objects.all()
    serializer_class = VoltageProfileSerializer


class CreateVoltageProfile(CreateAPIView):
    '''
    post: create new voltage profile

    .
    '''
    queryset = VoltageProfile.objects.all()
    serializer_class = VoltageProfileSerializer


class GetUpdateDeleteVoltageProfile(RetrieveUpdateDestroyAPIView):
    '''
    get: get a list of given measurements data

    .
    put: create data

    .
    patch: update given measurements data

    .
    delete: delete given voltage profile

    .
    '''
    queryset = VoltageProfile.objects.all()
    serializer_class = VoltageProfileSerializer


class GenerateCSVandSendVP(CreateAPIView):
    '''
    post: CSV send by email (body: email)

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
        for field in VoltageProfile._meta.fields:
            table_fields.append(field.name)

        writer.writerow(table_fields)
        # rows
        for field in VoltageProfile.objects.all().values_list():
            writer.writerow(field)

        message = EmailMessage("Voltage Profile data",
                               "Please find requested data attached. \nHave a nice day!",
                               os.environ.get('DEFAULT_FROM_EMAIL'),
                               [email])
        message.attach('touch_voltage_data_' + str(datetime.now()) + '.csv', csvfile.getvalue(), 'text/csv')
        message.send()
        return Response(status=200)


class GenerateCSV(RetrieveAPIView):
    '''
    get:  download Voltage profile data CSV

    .
    '''
    queryset = VoltageProfile.objects.all()
    serializer_class = VoltageProfileSerializer

    def get(self, request, *args, **kwargs):
        response = HttpResponse(content_type='text/csv', )
        response['Content-Disposition'] = 'attachment; filename=measurements_data_' + str(datetime.now()) + '.csv'

        writer = csv.writer(response)
        table_fields = []
        for field in VoltageProfile._meta.fields:
            table_fields.append(field.name)

        writer.writerow(table_fields)
        # rows
        for field in VoltageProfile.objects.all().values_list():
            writer.writerow(field)

        return response
