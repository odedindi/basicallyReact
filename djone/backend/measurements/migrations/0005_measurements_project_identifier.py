# Generated by Django 3.1 on 2021-04-21 08:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('measurements', '0004_auto_20210418_1723'),
    ]

    operations = [
        migrations.AddField(
            model_name='measurements',
            name='project_identifier',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]