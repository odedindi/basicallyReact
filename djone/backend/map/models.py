from django.db import models

# Create your models here.
from measurements.models import Measurements


class Map(models.Model):
     measurement = models.ForeignKey(to=Measurements, related_name='map',
                                     on_delete=models.SET_NULL, null=True)
     name = models.CharField(verbose_name='name', max_length=100, blank=True)
     project_identifier = models.CharField(max_length=100, blank=True)

     def __str__(self):
        return f' {self.id} {self.measurement}'