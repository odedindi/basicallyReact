from rest_framework import serializers

from measurements.models import Measurements


class MeasurementsSerializerBasic(serializers.ModelSerializer):

    class Meta:
        model = Measurements
        fields = ['id', 'customer', 'site', 'used_power_line', 'date',]


# 'fault_current', 'clearing_time',
#                   'touch_voltage_allowed', 'scaling_factor', 'scaled_touch_voltage_allowed', 'measuring_current'
