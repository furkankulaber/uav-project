# Generated by Django 4.2.10 on 2024-05-02 02:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='end_datetime',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='booking',
            name='start_datetime',
            field=models.DateField(),
        ),
    ]