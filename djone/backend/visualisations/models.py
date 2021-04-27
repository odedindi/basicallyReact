from django.db import models

from map.models import Map
from measurements.models import Measurements
from touch_voltage.models import TouchVoltage
from voltage_profile.models import VoltageProfile


class Visualisation(models.Model):
    measurement = models.ForeignKey(
        to=Measurements,
        related_name='measurement',
        on_delete=models.SET_NULL,
        null=True
    )
    results_map = models.OneToOneField(
        to=Map, related_name='visualisationTVMap',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    results_voltage_profile = models.OneToOneField(
        to=VoltageProfile, related_name='visualisationVP',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    project_identifier = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f'{self.id} visualisation of {self.measurement}'
