import os

from datetime import datetime

import io

from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from rest_framework.generics import ListAPIView, UpdateAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.response import Response

from measurements.models import Measurements

from visualisations.models import Visualisation

from django.core.mail import EmailMessage

from visualisations.serializers.serializers import VisualisationSerializer
from visualisations.serializers.serializers_basic import VisualisationSerializerBasic

from django.http import FileResponse


class ListVisualisation(ListAPIView):
    '''
    get: get a list of visualisations

    .
    '''
    queryset = Visualisation.objects.all()
    serializer_class = VisualisationSerializer


class CreateVisualisation(CreateAPIView):
    '''
    post: create new visualisations

    .
    '''
    queryset = Visualisation.objects.all()
    serializer_class = VisualisationSerializer


class UpdateVisualisation(UpdateAPIView):
    '''
    patch: update visualisations

    .
    '''
    queryset = Visualisation.objects.all()
    serializer_class = VisualisationSerializer






class GeneratePDF(RetrieveAPIView):
    '''
    get:  download given measurement's basic data PDF

    .
    '''
    queryset = Measurements.objects.all()
    serializer_class = VisualisationSerializerBasic
    permission_classes = []

    def get(self, request, *args, **kwargs):
        measurement = self.get_object()
        # Create a file-like buffer to receive PDF data.
        buffer = io.BytesIO()

        # Create the PDF object, using the buffer as its "file."
        p = canvas.Canvas(buffer)

        p.setFont("Helvetica-Bold", 25)
        p.drawString(90, 720, "    Axpo's Measurements data")
        p.setFont("Helvetica", 15)
        p.drawString(90, 620, f'Id: {measurement.id}')
        p.drawString(90, 590, f'Customer: {measurement.customer}')
        p.drawString(90, 560, f'Site: {measurement.site}')
        p.drawString(90, 530, f'Used power line: {measurement.used_power_line}')
        p.drawString(90, 500, f'Date: {measurement.date}')
        p.drawString(90, 470, f'Touch voltage allowed: {measurement.touch_voltage_allowed}')
        p.drawString(90, 440, f'Scaling factor: {measurement.scaling_factor}')
        p.drawString(90, 410, f'Scaled touch voltage allowed: {measurement.scaled_touch_voltage_allowed}')
        p.drawString(90, 380, f'Comment: {measurement.kommentar}')

        p.drawString(300, 250, 'Name: ...............................')
        p.drawString(300, 210, 'Date: .................................')
        p.drawString(300, 160, 'Signature: ..........................')
        p.setFont("Helvetica-Oblique", 7)
        p.drawString(90, 20, f'Confidential')
        p.drawImage('visualisations/axpologo.png', 500, 750, 0.7 * inch, 0.4 * inch)

        p.showPage()
        p.save()

        # FileResponse sets the Content-Disposition header so that browsers
        # present the option to save the file.
        buffer.seek(0)

        return FileResponse(buffer, as_attachment=True, filename='measurements_data_' + str(datetime.now()) + '.pdf')


class GeneratePDFandSend(CreateAPIView):
    '''
    post: send PDF by email (body: email)

    .
    '''
    serializer_class = VisualisationSerializerBasic

    queryset = Measurements.objects.all()
    permission_classes = []

    def perform_create(self, serializer):
        measurement = self.get_object()
        # Create a file-like buffer to receive PDF data.
        buffer = io.BytesIO()

        # Create the PDF object, using the buffer as its "file."
        p = canvas.Canvas(buffer)

        p.setFont("Helvetica-Bold", 25)
        p.drawString(90, 720, "    Axpo's Measurements data")
        p.setFont("Helvetica", 15)
        p.drawString(90, 620, f'Id: {measurement.id}')
        p.drawString(90, 600, f'Customer: {measurement.customer}')
        p.drawString(90, 580, f'Site: {measurement.site}')
        p.drawString(90, 560, f'Used power line: {measurement.used_power_line}')
        p.drawString(90, 540, f'Date: {measurement.date}')
        p.drawString(90, 470, f'Touch voltage allowed: {measurement.touch_voltage_allowed}')
        p.drawString(90, 440, f'Scaling factor: {measurement.scaling_factor}')
        p.drawString(90, 410, f'Scaled touch voltage allowed: {measurement.scaled_touch_voltage_allowed}')
        p.drawString(90, 380, f'Comment: {measurement.kommentar}')

        p.drawString(300, 250, 'Name: ...............................')
        p.drawString(300, 210, 'Date: .................................')
        p.drawString(300, 160, 'Signature: ..........................')
        p.setFont("Helvetica-Oblique", 7)
        p.drawString(90, 20, f'Confidential')
        p.drawImage('visualisations/axpologo.png', 500, 750, 0.7 * inch, 0.4 * inch)

        p.showPage()
        p.save()

        # FileResponse sets the Content-Disposition header so that browsers
        # present the option to save the file.
        buffer.seek(0)

        pdf_file = FileResponse(buffer, as_attachment=False,
                                filename='measurements_data_' + str(datetime.now()) + '.pdf')

        email = self.request.data["email"]

        message = EmailMessage("Measurements data",
                               "Please find requested data attached. \nHave a nice day!",
                               os.environ.get('DEFAULT_FROM_EMAIL'),
                               [email])
        message.attach('measurements_data_' + str(datetime.now()) + '.pdf', pdf_file.getvalue(), 'application/pdf')
        message.send()
        return Response(status=200)
