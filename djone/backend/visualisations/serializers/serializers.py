
from rest_framework import serializers


from visualisations.models import Visualisation


class VisualisationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Visualisation
        fields = '__all__'

