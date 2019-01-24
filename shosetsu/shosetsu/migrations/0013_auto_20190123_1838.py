# Generated by Django 2.1.5 on 2019-01-23 18:38

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('shosetsu', '0012_auto_20190122_2242'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='book',
            name='modified_date',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='chapter',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='chapter',
            name='modified_date',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='element',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='element',
            name='modified_date',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='elementfield',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='elementfield',
            name='modified_date',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='elementinstance',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='elementinstance',
            name='modified_date',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='elementvalue',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='elementvalue',
            name='modified_date',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='project',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='modified_date',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
