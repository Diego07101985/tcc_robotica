
from django.conf.urls import url
from .views  import *

urlpatterns = [
    url(r'^$',automotivo_detail,name="detail"),
    url(r'^perfil/(?P<perfil_name>[\w-]+)/$',automotivo_exibir,name="perfil"),
    url(r'^create/(?P<perfil_name>[\w-]+)/$',automotivo_create,name="create"),
    url(r'^registrar/', automotivo_post_create, name="registrar")
]