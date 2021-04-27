
from rest_framework import serializers

from user.serializers import UserSerializer
from voltage_profile.models import VoltageProfile


class VisualisationSerializerBasic(serializers.ModelSerializer):
    email = UserSerializer(read_only=True, many=True)

    class Meta:
        model = VoltageProfile
        fields = ['email',]

