from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()


class Book(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()


class Chapter(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, null=True, blank=True)
    content = models.TextField()
    notes = models.TextField()
