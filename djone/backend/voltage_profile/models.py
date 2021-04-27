from django.db import models

from measurements.models import Measurements


# Corresponds to Potential's Drop
class VoltageProfile(models.Model):
    measurement = models.ForeignKey(to=Measurements, related_name='voltage_profile',
                                    on_delete=models.SET_NULL, null=True)
    project_identifier = models.CharField(max_length=100, blank=True)
    direction = models.CharField(verbose_name='Direction', max_length=20, blank=True)
    distanz = models.CharField(verbose_name='Distance1', max_length=20, blank=True)
    spannung = models.CharField(verbose_name='Voltage1', max_length=20, blank=True)
    bemerkung = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz1 = models.CharField(verbose_name='Distance1', max_length=20, blank=True)
    spannung1 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung1 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz2 = models.CharField(verbose_name='Distance2', max_length=20, blank=True)
    spannung2 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung2 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz3 = models.CharField(verbose_name='Distance3', max_length=20, blank=True)
    spannung3 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung3 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz4 = models.CharField(verbose_name='Distance4', max_length=20, blank=True)
    spannung4 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung4 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz5 = models.CharField(verbose_name='Distance5', max_length=20, blank=True)
    spannung5 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung5 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz6 = models.CharField(verbose_name='Distance6', max_length=20, blank=True)
    spannung6 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung6 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz7= models.CharField(verbose_name='Distance7', max_length=20, blank=True)
    spannung7 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung7 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz8 = models.CharField(verbose_name='Distance8', max_length=20, blank=True)
    spannung8 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung8 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz9 = models.CharField(verbose_name='Distance9', max_length=20, blank=True)
    spannung9 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung9 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz10 = models.CharField(verbose_name='Distance10', max_length=20, blank=True)
    spannung10 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung10 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz12 = models.CharField(verbose_name='Distance12', max_length=20, blank=True)
    spannung12 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung12 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz13 = models.CharField(verbose_name='Distance13', max_length=20, blank=True)
    spannung13 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung13 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz14 = models.CharField(verbose_name='Distance14', max_length=20, blank=True)
    spannung14 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung14 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz15 = models.CharField(verbose_name='Distance15', max_length=20, blank=True)
    spannung15 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung15 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz16 = models.CharField(verbose_name='Distance16', max_length=20, blank=True)
    spannung16 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung16 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz17 = models.CharField(verbose_name='Distance17', max_length=20, blank=True)
    spannung17 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung17 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz18 = models.CharField(verbose_name='Distance18', max_length=20, blank=True)
    spannung18 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung18 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz19 = models.CharField(verbose_name='Distance19', max_length=20, blank=True)
    spannung19 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung19 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz20 = models.CharField(verbose_name='Distance20', max_length=20, blank=True)
    spannung20 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung20 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz21 = models.CharField(verbose_name='Distance21', max_length=20, blank=True)
    spannung21 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung21 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz22 = models.CharField(verbose_name='Distance22', max_length=20, blank=True)
    spannung22 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung22 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz23 = models.CharField(verbose_name='Distance23', max_length=20, blank=True)
    spannung23 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung23 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz24 = models.CharField(verbose_name='Distance24', max_length=20, blank=True)
    spannung24 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung24 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz25 = models.CharField(verbose_name='Distance25', max_length=20, blank=True)
    spannung25 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung25 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz26 = models.CharField(verbose_name='Distance26', max_length=20, blank=True)
    spannung26 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung26 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz27 = models.CharField(verbose_name='Distance27', max_length=20, blank=True)
    spannung27 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung27 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz28 = models.CharField(verbose_name='Distance28', max_length=20, blank=True)
    spannung28 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung28 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz29 = models.CharField(verbose_name='Distance29', max_length=20, blank=True)
    spannung29 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung29 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)

    distanz30 = models.CharField(verbose_name='Distance30', max_length=20, blank=True)
    spannung30 = models.CharField(verbose_name='Voltage', max_length=20, blank=True)
    bemerkung30 = models.CharField(verbose_name='Comment', max_length=1200, blank=True)


    date = models.DateTimeField(verbose_name='date', auto_now_add=True, null=True)

    def __str__(self):
        return f' {self.id} {self.measurement}'
