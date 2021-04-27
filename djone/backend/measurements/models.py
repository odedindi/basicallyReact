from django.conf import settings
from django.db import models


def user_directory_path(instance, filename):
    return f'{instance.id}/{filename}'


class Measurements(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='measurements',
                             on_delete=models.SET_NULL, null=True)
    project_identifier = models.CharField(max_length=100, blank=True)
    # Basic data earth measurement
    customer = models.CharField(max_length=200, blank=True)
    site = models.CharField(verbose_name='Plant/Equipment', max_length=200, blank=True)
    used_power_line = models.CharField(verbose_name='cable used', max_length=200, blank=True)
    date = models.DateField(verbose_name='date basic data', auto_now_add=False, blank=True, null=True)
    updated_form_date = models.DateTimeField(auto_now=True)

    fault_current = models.CharField(max_length=200, blank=True)
    clearing_time = models.CharField(max_length=200, blank=True)
    touch_voltage_allowed = models.CharField(max_length=200, blank=True)
    scaling_factor = models.CharField(max_length=200, blank=True)
    scaled_touch_voltage_allowed = models.CharField(max_length=200, blank=True)
    measuring_current = models.CharField(max_length=200, blank=True)

    # from powerpoint last slide info
    additional_info_attributes = models.CharField(max_length=20, blank=True)
    measurement_values = models.CharField(max_length=20, blank=True)
    location_on_map = models.CharField(max_length=20, blank=True)

    #  Basisdaten Erdnungsmessung
    firma = models.CharField(verbose_name='Client', max_length=20, blank=True)
    anlage = models.CharField(verbose_name='Plant / Equipment', max_length=20, blank=True)
    benutzte_leitung = models.CharField(verbose_name='Cable Used', max_length=200, blank=True)
    datum_auto_add = models.DateTimeField(verbose_name='Date', auto_now_add=True)
    erdschluss_storm = models.CharField(verbose_name='Earth Fault Current', max_length=20, blank=True)
    fehlerklaerungszeit = models.CharField(verbose_name='Error Resolving Time', max_length=20, blank=True)
    erlaubte_beruhrungsspannung = models.CharField(verbose_name='Allowed Touch Voltage', max_length=20, blank=True)
    mess_strom = models.CharField(verbose_name='Measuring Current', max_length=20, blank=True)
    skalierungsfaktor = models.CharField(verbose_name='Scaling Factor', max_length=20, blank=True)
    erlaubte_beruhrungsspannung_skaliert = models.CharField(verbose_name='Allowed Touch Voltage scaled',
                                                            max_length=20, blank=True)

    # Messparameter
    primaestrom = models.CharField(verbose_name='first storm', max_length=20, blank=True)
    messstrom = models.CharField(verbose_name='Measuring Current-Messparameter', max_length=20, blank=True)
    schleifenspannung = models.CharField(verbose_name='schleifenspannung', max_length=200, blank=True)
    temperature = models.CharField(max_length=20, blank=True)
    wetter = models.CharField(verbose_name='weather', max_length=200, blank=True)
    Bodenfeuchte = models.CharField(max_length=20, blank=True)
    leitung1 = models.CharField(verbose_name='Cables1', max_length=20, blank=True)
    strom_A_1 = models.CharField(verbose_name='Current1', max_length=20, blank=True)
    leitung2 = models.CharField(verbose_name='Cables2', max_length=20, blank=True)
    strom_A_2 = models.CharField(verbose_name='Current1', max_length=20, blank=True)

    # Leerlaufgrössen
    phase1 = models.CharField(verbose_name='Phase L1', max_length=20, blank=True, null=True)
    phase2 = models.CharField(verbose_name='Phase L2', max_length=20, blank=True, null=True)
    phase1_3storm = models.CharField(verbose_name='Phase L1-3 together. Storm [A]', max_length=20,
                                        blank=True, null=True)
    phase1_3Spannung = models.CharField(verbose_name='Phase L1-3 together. Spannung [V]', max_length=20, blank=True, null=True)

    # Referenzsonde
    uhrzeit1 = models.CharField(verbose_name='Time1', max_length=20, blank=True)
    strom1 = models.CharField(verbose_name='Current1', max_length=20, blank=True)
    spannung1 = models.CharField(verbose_name='Voltage1', max_length=20, blank=True)
    uhrzeit2 = models.CharField(verbose_name='Time2', max_length=20, blank=True)
    strom2 = models.CharField(verbose_name='Current2', max_length=20, blank=True)
    spannung2 = models.CharField(verbose_name='Voltage2', max_length=20, blank=True)
    uhrzeit3 = models.CharField(verbose_name='Time3', max_length=20, blank=True)
    strom3 = models.CharField(verbose_name='Current3', max_length=20, blank=True)
    spannung3 = models.CharField(verbose_name='Voltage3', max_length=20, blank=True)
    uhrzeit4 = models.CharField(verbose_name='Time4', max_length=20, blank=True)
    strom4 = models.CharField(verbose_name='Current4', max_length=20, blank=True)
    spannung4 = models.CharField(verbose_name='Voltage4', max_length=20, blank=True)
    uhrzeit5 = models.CharField(verbose_name='Time5', max_length=20, blank=True)
    strom5 = models.CharField(verbose_name='Current5', max_length=20, blank=True)
    spannung5 = models.CharField(verbose_name='Voltage5', max_length=20, blank=True)
    uhrzeit6 = models.CharField(verbose_name='Time6', max_length=20, blank=True)
    strom6 = models.CharField(verbose_name='Current6', max_length=20, blank=True)
    spannung6 = models.CharField(verbose_name='Voltage6', max_length=20, blank=True)

    # Frequenausgleich
    Strom_A_45Hz = models.CharField(verbose_name='Current 45Hz', max_length=20, blank=True)
    Spannung_V_45Hz = models.CharField(verbose_name='Voltage 45Hz', max_length=20, blank=True)

    Strom_A_58Hz = models.CharField(verbose_name='Current 58Hz', max_length=20, blank=True)
    Spannung_V_58Hz = models.CharField(verbose_name='Voltage 58Hz', max_length=20, blank=True)

    Strom_A_65Hz = models.CharField(verbose_name='Current 65Hz', max_length=20, blank=True)
    Spannung_V_65Hz = models.CharField(verbose_name='Voltage 65Hz', max_length=20, blank=True)

    kommentar = models.CharField(verbose_name='comment', max_length=1200, blank=True)

    # Spannungen

    # Energieleitungen

    # Kleinleitungen

    def __str__(self):
        return f'{self.id} Measurement for {self.customer}'
