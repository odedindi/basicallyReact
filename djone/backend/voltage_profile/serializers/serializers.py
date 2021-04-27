
from rest_framework import serializers

from voltage_profile.models import VoltageProfile


class VoltageProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = VoltageProfile
        fields = '__all__'

