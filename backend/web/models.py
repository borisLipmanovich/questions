from __future__ import unicode_literals
from django.db import models
from django.utils.encoding import smart_text
from django.contrib.auth.models import User

# Create your models here.

class Question(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length = 120, null=True, blank=True)
    description = models.CharField(max_length = 120, null=True, blank=True)
    author = models.ForeignKey(User)

    def __unicode__(self):
        return smart_text(self.title)

