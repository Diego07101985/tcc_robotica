from django.contrib import admin

# Register your models here.
from .models import Perfil   	


class PerfilModelAdmin(admin.ModelAdmin):
	list_display = ["nome","updated","servo_motor","id"]
	list_display_links = ["updated"]
	list_editable = ["nome"]
	list_filter = ["nome"]
	list_delete = ["nome"]

	class Meta:
		model = Perfil

admin.site.register(Perfil,PerfilModelAdmin)