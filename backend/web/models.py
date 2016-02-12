from __future__ import unicode_literals
from django.db import models
from django.utils.encoding import smart_text

# Create your models here.

class Question(models.Model):
    title = models.CharField(max_length = 120, null=True, blank=True)
    description = models.CharField(max_length = 120, null=True, blank=True)
    author = models.CharField(max_length = 120, null=True, blank=True)

    def __unicode__(self):
        return smart_text(self.title)