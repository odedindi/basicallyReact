# Generated by Django 3.1 on 2021-04-15 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('measurements', '0002_measurements_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='measurements',
            name='kommentar',
            field=models.CharField(blank=True, max_length=1200, verbose_name='comment'),
        ),
    ]