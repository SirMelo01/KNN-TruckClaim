# Generated by Django 4.0.10 on 2024-11-05 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ycms', '0032_alter_textcontent_buttontext_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='usersettings',
            name='global_font',
            field=models.CharField(default='font-sans', max_length=60),
        ),
        migrations.AddField(
            model_name='usersettings',
            name='vacation',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='usersettings',
            name='vacationText',
            field=models.CharField(default='Wir sind aktuell im Urlaub. Ab dem XX.XX sind wir wieder für Sie da!', max_length=200),
        ),
    ]
