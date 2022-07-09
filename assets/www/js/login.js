var DADOS_LOGIN = [];

function abre_login(){
	openPage('login');
	auto_login();
}

function auto_login() {
	var storage = window.localStorage;
	var getRA = storage.getItem("ra")
	var getSenha = storage.getItem("senha")


	console.log(getSenha);

	if (getRA.length > 0) {
		var url = DEF_URL+"/logar.php?ra="+getRA+"&senha="+getSenha;
		console.log(url)
		MobileUI.ajax.get(url).end(result_login);
		loadingElement('btn_login', 'Fazendo login...')

		function result_login(error, res, status) {
			console.log(res)
			if (error) {
				alert("Verifique a sua conexão com a internet.");
				closeLoading('btn_login', 'Fazer Login')
				return console.log(error);
			}else if(res.body[0].status == '2'){
				alert({
					title:'Pendente',
					message: res.body[0].resposta,
					buttons:[
					{
						label: 'OK',
						onclick: function(){
							closeAlert();
						}
					}
					]
				});
				closeLoading('btn_login', 'Fazer Login')
			}else if(res.body[0].status == '3'){
				alert({
					title:'Bloqueado',
					message: res.body[0].resposta,
					buttons:[
					{
						label: 'OK',
						onclick: function(){
							closeAlert();
						}
					}
					]
				});
				closeLoading('btn_login', 'Fazer Login')
			}else if(res.body[0].status == '0'){

				alert({
					title:'Dados Incorretos',
					message: res.body[0].resposta,
					buttons:[
					{
						label: 'OK',
						onclick: function(){
							closeAlert();
						}
					}
					]
				});
				closeLoading('btn_login', 'Fazer Login')
			}else if(res.body[0].status == '1'){
				if(res.body[0].tipo == '1'){
					openPage('menu_analista');
					closeLoading('btn_login', 'Fazer Login')
					//limpa os campos
					document.getElementById("RA").value = "";
					document.getElementById("senha").value = "";
				}else if(res.body[0].tipo == '3'){
					openPage('menu_auditoria');
					closeLoading('btn_login', 'Fazer Login')
					//limpa os campos
					document.getElementById("RA").value = "";
					document.getElementById("senha").value = "";
				}else{
					openPage('menu_aluno');
					closeLoading('btn_login', 'Fazer Login')
					//limpa os campos
					document.getElementById("RA").value = "";
					document.getElementById("senha").value = "";
				}
			}

			console.log(res)

			DADOS_LOGIN.length = 0;
			for (i = 0; i < res.body.length; i++) {
				var login = {};
				login.curso_aluno = res.body[i].curso_aluno;
				login.dataContato = res.body[i].data_contato;
				login.telefone    = res.body[i].telefone;
				login.id          = res.body[i].id_user;
				login.nome        = res.body[i].nome;
				login.ra          = res.body[i].ra;

				DADOS_LOGIN.push(login);
				console.log(DADOS_LOGIN[0].nome)
			}
		}

	} else {
		console.log("erro")
	}
}

function login() {
	var ra = document.getElementById("RA").value;
	var senha = document.getElementById("senha").value;

	if(!ra){
		alert({
			title:'RA',
			message:'Preencha seu RA.',
			buttons:[
			{
				label: 'OK',
				onclick: function(){
					closeAlert();
				}
			}
			]
		});
	}else if(!senha){
		alert({
			title:'Senha',
			message:'Preencha sua senha.',
			buttons:[
			{
				label: 'OK',
				onclick: function(){
					closeAlert();
				}
			}
			]
		});
	}else{
		var url = DEF_URL+"/logar.php?ra="+ra+"&senha="+senha;
		console.log(url)
		MobileUI.ajax.get(url).end(result_login);
		loadingElement('btn_login', 'Fazendo login...')

		function result_login(error, res, status) {
			console.log(res)
			if (error) {
				alert("Verifique a sua conexão com a internet.");
				closeLoading('btn_login')
				return console.log(error);
			}else if(res.body[0].status == '2'){
				alert({
					title:'Pendente',
					message: res.body[0].resposta,
					buttons:[
					{
						label: 'OK',
						onclick: function(){
							closeAlert();
						}
					}
					]
				});
				closeLoading('btn_login')
			}else if(res.body[0].status == '3'){
				alert({
					title:'Bloqueado',
					message: res.body[0].resposta,
					buttons:[
					{
						label: 'OK',
						onclick: function(){
							closeAlert();
						}
					}
					]
				});
				closeLoading('btn_login')
			}else if(res.body[0].status == '0'){

				alert({
					title:'Dados Incorretos',
					message: res.body[0].resposta,
					buttons:[
					{
						label: 'OK',
						onclick: function(){
							closeAlert();
						}
					}
					]
				});
				closeLoading('btn_login')
			}else if(res.body[0].status == '1'){


				var chk_login = document.getElementById('chk_autoLogin').checked
				console.log('auto_login', chk_login)
				if (chk_login == true) {
                    salvar_login(ra, senha)
                }

				if(res.body[0].tipo == '1'){
					openPage('menu_analista');
					closeLoading('btn_login')
					//limpa os campos
					document.getElementById("RA").value = "";
					document.getElementById("senha").value = "";
				}else if(res.body[0].tipo == '3'){
					openPage('menu_auditoria');
					closeLoading('btn_login')
					//limpa os campos
					document.getElementById("RA").value = "";
					document.getElementById("senha").value = "";
				}else{
					openPage('menu_aluno');
					closeLoading('btn_login')
					//limpa os campos
					document.getElementById("RA").value = "";
					document.getElementById("senha").value = "";
				}
			}

			console.log(res)

			DADOS_LOGIN.length = 0;
			for (i = 0; i < res.body.length; i++) {
				var login = {};
				login.curso_aluno = res.body[i].curso_aluno;
				login.dataContato = res.body[i].data_contato;
				login.telefone    = res.body[i].telefone;
				login.id          = res.body[i].id_user;
				login.nome        = res.body[i].nome;
				login.ra          = res.body[i].ra;

				DADOS_LOGIN.push(login);
				console.log(DADOS_LOGIN[0].nome)
			}
		}
	}
}

function salvar_login(ra, senha) {

    var storage = window.localStorage;
    storage.setItem("ra", ra)
    storage.setItem("senha", senha)

    var getRA = storage.getItem("ra")
    var getSenha = storage.getItem("senha")

    console.log(getRA);
    console.log(getSenha);
}