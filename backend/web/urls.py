from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.question_list),
    url(r'^(?P<id>\w+)/$', views.question_detail),
]