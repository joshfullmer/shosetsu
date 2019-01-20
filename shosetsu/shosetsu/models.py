from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title


class Book(models.Model):
    project = models.ForeignKey(
        Project,
        related_name='books',
        on_delete=models.CASCADE
    )
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title


class Chapter(models.Model):
    book = models.ForeignKey(
        Book,
        related_name='chapters',
        on_delete=models.CASCADE
    )
    title = models.CharField(max_length=100, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title


class Element(models.Model):
    name = models.CharField(max_length=100)
    project = models.ForeignKey(
        Project,
        related_name='elements',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class ElementInstance(models.Model):
    name = models.CharField(max_length=100)
    project = models.ForeignKey(
        Project,
        related_name='element_instances',
        on_delete=models.CASCADE
    )
    element = models.ForeignKey(
        Element,
        related_name='element_instances',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class ElementField(models.Model):
    element = models.ForeignKey(
        Element,
        related_name='element_fields',
        on_delete=models.CASCADE
    )
    label = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    details = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.label


class ElementValue(models.Model):
    element_instance = models.ForeignKey(
        ElementInstance,
        related_name='element_values',
        on_delete=models.CASCADE
    )
    element_field = models.ForeignKey(
        ElementField,
        related_name='element_values',
        on_delete=models.CASCADE
    )
    value = models.TextField()
