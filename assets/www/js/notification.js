document.addEventListener('deviceready', function () {

  // var notificationOpenedCallback = function(jsonData) {
  //   console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  // };

  window.plugins.OneSignal
    .startInit("72345ecb-7fab-41ec-93da-2539c042a9d2")
    .handleNotificationOpened(mensagemRecebida)
    .endInit();
}, false);

function mensagemRecebida(data){
	document.getElementById("msg").value = JSON.stringify(data);
}