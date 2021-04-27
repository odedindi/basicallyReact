from rest_framework import serializers

from measurements.models import Measurements


class MeasurementsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Measurements
        fields = '__all__'

