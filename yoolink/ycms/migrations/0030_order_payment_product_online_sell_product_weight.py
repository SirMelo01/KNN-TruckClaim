# Generated by Django 4.0.10 on 2024-02-16 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ycms', '0029_order_paid'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='payment',
            field=models.CharField(choices=[('TRANSFER', 'Überweisung/Paypal'), ('CASH', 'Barzahlung')], default='CASH', max_length=20),
        ),
        migrations.AddField(
            model_name='product',
            name='online_sell',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='product',
            name='weight',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True),
        ),
    ]
