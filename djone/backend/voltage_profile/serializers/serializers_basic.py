
from rest_framework import serializers

from voltage_profile.models import VoltageProfile


class VoltageProfileSerializerBasic(serializers.ModelSerializer):

    class Meta:
        model = VoltageProfile
        fields = ['direction',]

