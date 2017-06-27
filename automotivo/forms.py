from django import forms
from django.contrib.auth.models import User

class UsuarioForm(forms.Form):

    ESCOLHAS_AR = [('1','low'),
         ('2','medium'),('3','high')]

    ESCOLHAS_SERVOMOTOR =[(90,"90°"),
         (120,"120°"),(150,"150°")] 
         
         
    nome = forms.CharField(widget =forms.HiddenInput(),required=True)
    radio = forms.BooleanField(widget= forms.CheckboxInput(), required=False)
    ar_condicionado= forms.ChoiceField(choices=ESCOLHAS_AR, widget=forms.RadioSelect())
    servo_motor= forms.ChoiceField(choices=ESCOLHAS_SERVOMOTOR, widget=forms.RadioSelect())
