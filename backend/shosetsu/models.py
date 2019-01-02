from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()


class Book(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
