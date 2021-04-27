from django.db import models

# Create your models here.
from map.models import Map
from measurements.models import Measurements


def user_directory_path(instance, filename):
    return f'{instance.id}/{filename}'


class TouchVoltage(models.Model):
    # touch_voltage_annotation

    map = models.ForeignKey(to=Map, related_name='touch_voltage_annotation_map',
                            on_delete=models.SET_NULL, null=True)
    project_identifier = models.CharField(max_length=100, blank=True)
    # marker = models.CharField(max_length=2, choices=MARKERS)
    bezeichnung = models.CharField(verbose_name='description', max_length=1200, blank=True)
    kategorie = models.CharField(verbose_name='category', max_length=2)
    beruhrungsspannung_high_Z = models.CharField(verbose_name='touch_voltage_high_Z', max_length=20, blank=True)
    # changing colour thingy for the voltage low Z - to explore (FE)
    beruhrungsspannung_low_Z = models.CharField(verbose_name='touch_voltage_low_Z', max_length=200, blank=True)
    kommentar = models.CharField(verbose_name='comment', max_length=1200, blank=True)
    date = models.DateTimeField(verbose_name='date', auto_now_add=True)
    foto = models.ImageField(verbose_name='Add photo', upload_to=user_directory_path, blank=True)
    spannungsdiff_low_Z = models.CharField(max_length=20, blank=True)
    spannungsdiff_high_Z = models.CharField(max_length=20, blank=True)

    geometry_x = models.CharField(max_length=20, blank=True)
    geometry_y = models.CharField(max_length=20, blank=True)

    frontend_id = models.CharField(max_length=20, blank=True)
    map_name = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f' {self.id} {self.map}'
