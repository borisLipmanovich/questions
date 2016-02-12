from django.contrib import admin
from .models import Question

# Register your models here.

class QuestionAdmin(admin.ModelAdmin):
    class Meta:
        model = Question

admin.site.register(Question, QuestionAdmin)