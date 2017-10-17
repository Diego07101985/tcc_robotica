// This function connects to the rosbridge server running on the local computer on port 9090

var rbServer = new ROSLIB.Ros({
    url : 'ws://0.tcp.ngrok.io:10430'
 });

  var servo_motor = $("#hidden_servo").val();
  var ar_condicionado= $("#hidden_ar_condicionado").val();
  var radio_perfil = $("#hidden_radio").attr("value");

  
  $(".panel-class").css("display","none");

  validaRadio();

function validaRadio(){
  if(radio_perfil == "True"){

  $(document).ready(function() {
          $('#id_radio').iphoneStyle({
                checkedLabel: 'YES',
                uncheckedLabel: 'NO'
            });});
     
      }
  else{
     $(document).ready(function() {
          $('#id_radio').iphoneStyle({
                checkedLabel: 'NO',
                uncheckedLabel: 'Yes'
            });});
  } 
}




 $("#id_radio").change(function()
 { 
   if(radio_perfil == "True"){      
        $("#hidden_radio").prop("value","True");
        radio_perfil = "False";
       }
  else{   
      $("#hidden_radio").prop("value","False");
      radio_perfil = "True";
  } 
 });

$( "#target" ).submit(function( event ) {
  if(radio_perfil== "True"){
      $("#id_radio").prop("checked",true);
  }
});



 $('input[type=radio]').each(function(index) {
     if($(this).val() == servo_motor || $(this).val() == ar_condicionado){
        $(this).attr('checked', 'checked');
   }
});


setTimeout(function() {
            $('.alert-success').fadeOut('slow');
  }, 4000);         
 

$("#detectar_pessoa" ).on("click",function() {
    executarBuscaFacial();
});

$("#classificacao_button" ).on("click",function() {
    executarClassificacaoFacial();
});

$("#aplicar" ).on("click",function() {
    /*setarValoresArduino();*/
});
var template = $("#feedback");
var response = "";
 

 function executarBuscaFacial(){
    var face_client = new ROSLIB.Service({
        ros : rbServer,
        name : '/face_reco',
        serviceType : 'tcc_robotica/face_server'
    });

    var request = new ROSLIB.ServiceRequest({
        tipo: parseInt($("#tipo_algoritmo").val()), 
     });
   
    face_client.callService(request, function(result) {
       response = result.nome
       if(response == "desconhecido") {
            $(".panel-class").show();
            $(".login_jumbo").css("display","none");
        }
        else{
            $(location).attr("href", "/automotivo/perfil/"+response)
        }

   });
 }



 function executarClassificacaoFacial(){
    var face_client = new ROSLIB.Service({
        ros : rbServer,
        name : '/face_detect',
        serviceType : 'tcc_robotica/face_detect'
    });

    var request = new ROSLIB.ServiceRequest({
        tipo: parseInt($("#tipo_algoritmo").val()),
        nome : $("#nome").val()
     });
   
    face_client.callService(request, function(result) {
       valor = result.classificacao
      if(valor){
           $(location).attr("href", "/automotivo/create/"+$("#nome").val());
     }
   });
 }


 function setarValoresArduino(){
    var face_client = new ROSLIB.Service({
        ros : rbServer,
        name : '/arduino',
        serviceType : 'tcc_robotica/arduino'
    });

    var request = new ROSLIB.ServiceRequest({
        servo_angulo: parseInt(servo_motor),
        radio : radio_perfil=="True",
        nivel_arcondicionado :parseInt(ar_condicionado),
     });
   
    face_client.callService(request, function(result) {
       valor = result.update_servo
   });

 }