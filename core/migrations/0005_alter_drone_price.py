# Generated by Django 4.2.10 on 2024-05-03 03:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_remove_price_drone_drone_currency_drone_price_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='drone',
            name='price',
            field=models.DecimalField(decimal_places=3, max_digits=8),
        ),
    ]