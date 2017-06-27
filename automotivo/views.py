from django.shortcuts import render
from django.shortcuts import redirect
from django.views.generic.base import View
from .models import Perfil  
from .forms  import UsuarioForm
from django.contrib import messages
from django.utils.datastructures import MultiValueDictKeyError
# Create your views here.

def automotivo_detail(request,slug=None):
	return render(request,"automotivo_login.html")


def automotivo_exibir(request, perfil_name):
    perfil = Perfil.objects.get(nome=perfil_name)
    form = UsuarioForm()
    context = {
		"perfil":perfil,
		'form': form,
	}
    return render(request, 'automotivo_perfil.html',context)


def automotivo_post_create(request):
    
    form = UsuarioForm(request.POST)
    dados_form = form.data
    radio = ""
    perfil = Perfil.objects.get(nome=dados_form["nome"])
    try:
        if(dados_form["radio"] == "on"):
            perfil.radio =True
    except  MultiValueDictKeyError:
        perfil.radio = False  
    
    perfil.nome = dados_form["nome"]
    perfil.servo_motor=dados_form["servo_motor"]
    perfil.ar_condicionado=dados_form["ar_condicionado"]

    perfil.save()
    messages.add_message(request, messages.INFO, 'Perfil foi atualizado no sistema')

    context = {
        "perfil":perfil,
    }
    return redirect('/automotivo/perfil/'+perfil.nome,context)			

def automotivo_create(request, perfil_name):
    count = Perfil.objects.all().filter(nome=perfil_name).count()
    if count<1: 
        perfil = Perfil.objects.create(nome=perfil_name)
    else:
        perfil = Perfil.objects.filter(nome=perfil_name)[0]

    perfil.servo_motor = 90
    perfil.ar_condicionado = 1
    perfil.radio = True

    context = {
	    "perfil":perfil,
    }
    return redirect('/automotivo/perfil/'+perfil.nome,context)
