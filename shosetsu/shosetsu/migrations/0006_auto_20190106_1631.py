# Generated by Django 2.1.4 on 2019-01-06 23:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shosetsu', '0005_chapter'),
    ]

    operations = [
        migrations.CreateModel(
            name='Element',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='ElementField',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('label', models.TextField(max_length=100)),
                ('type', models.CharField(max_length=100)),
                ('details', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ElementType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shosetsu.Project')),
            ],
        ),
        migrations.CreateModel(
            name='ElementValue',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.TextField()),
                ('element', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shosetsu.Element')),
                ('element_field', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shosetsu.ElementField')),
            ],
        ),
        migrations.AlterField(
            model_name='chapter',
            name='content',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='chapter',
            name='notes',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='elementfield',
            name='element_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shosetsu.ElementType'),
        ),
        migrations.AddField(
            model_name='element',
            name='element_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shosetsu.ElementType'),
        ),
        migrations.AddField(
            model_name='element',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shosetsu.Project'),
        ),
    ]