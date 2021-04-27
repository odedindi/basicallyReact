
from rest_framework import serializers

from touch_voltage.models import TouchVoltage


class TouchVoltageSerializer(serializers.ModelSerializer):

    class Meta:
        model = TouchVoltage
        fields = '__all__'

