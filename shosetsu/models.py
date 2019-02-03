from django.db import models


class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Project(BaseModel):
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title


class Book(BaseModel):
    project = models.ForeignKey(
        Project,
        related_name='books',
        on_delete=models.CASCADE
    )
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title


class Chapter(BaseModel):
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


class Element(BaseModel):
    name = models.CharField(max_length=100)
    project = models.ForeignKey(
        Project,
        related_name='elements',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class ElementInstance(BaseModel):
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


class ElementField(BaseModel):
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


class ElementValue(BaseModel):
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

    class Meta:
        unique_together = ('element_instance', 'element_field')
