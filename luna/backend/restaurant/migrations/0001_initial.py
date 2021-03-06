# Generated by Django 3.1 on 2021-04-02 09:02

from django.db import migrations, models
import restaurant.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('category', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=70)),
                ('country', models.CharField(max_length=70, verbose_name='Country')),
                ('street', models.CharField(max_length=70, verbose_name='Street')),
                ('city', models.CharField(max_length=70, verbose_name='City')),
                ('zip_code', models.CharField(blank=True, max_length=70, verbose_name='ZIP / Postal code')),
                ('website', models.CharField(blank=True, max_length=70)),
                ('phone', models.CharField(max_length=20)),
                ('email', models.EmailField(blank=True, max_length=70)),
                ('opening_hours', models.CharField(max_length=60, null=True)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to=restaurant.models.user_directory_path)),
                ('created', models.DateTimeField(auto_now_add=True, null=True)),
                ('longitude', models.CharField(blank=True, max_length=50, null=True)),
                ('latitude', models.CharField(blank=True, max_length=50, null=True)),
                ('price_level', models.CharField(choices=[('0', 'No information'), ('1', '$'), ('2', '$$'), ('3', '$$$')], default='0', max_length=2)),
                ('WIFI', models.BooleanField(blank=True, null=True)),
                ('take_away', models.BooleanField(blank=True, null=True, verbose_name='Take away')),
                ('delivery', models.BooleanField(blank=True, null=True)),
                ('take_reservations', models.BooleanField(blank=True, null=True, verbose_name='Take reservations')),
                ('credit_cards', models.BooleanField(blank=True, null=True, verbose_name='Credit cards')),
                ('waiter_service', models.BooleanField(blank=True, null=True, verbose_name='Waiter service')),
                ('noise_level', models.CharField(blank=True, choices=[('0', 'No information'), ('1', '!'), ('2', '!!'), ('3', '!!!')], default='0', max_length=2, verbose_name='Noise level')),
                ('categories', models.ManyToManyField(related_name='restaurants', to='category.Category')),
            ],
        ),
    ]
