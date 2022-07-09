function cadastrar_aluno() {
	var ra_cadastro   = document.getElementById("ra_cadastro").value;
	var nome_cadastro = document.getElementById("nome_cadastro").value;
	var cpf_cadastro  = document.getElementById("cpf_cadastro").value;

	if(!ra_cadastro){
		alert("Ops, você esqueceu de digitar seu RA, digite e tente novamente.");
		return false;
	}

	if(!nome_cadastro){
		alert("Ops, você esqueceu de digitar seu nome, digite e tente novamente.");
		return false;
	}

	if(!cpf_cadastro){
		alert("Ops, você esqueceu de digitar seu CPF, digite e tente novamente.");
		return false;
	}

	if(ra_cadastro.length > 7){
		alert("RA incorreto, verifique e tente novamente.");
		return false;
	}

	if(ra_cadastro.length < 6){
		alert("RA incorreto, verifique e tente novamente.");
		return false;
	}

	if(cpf_cadastro.length > 11){
		alert("CPF incorreto, verifique e tente novamente.");
		return false;
	}

	if(cpf_cadastro.length < 11){
		alert("CPF incorreto, verifique e tente novamente.");
		return false;
	}

	var url = DEF_URL+"/cadastro_aluno.php?ra_cadastro="+ra_cadastro+"&nome_cadastro="+nome_cadastro+"&cpf_cadastro="+cpf_cadastro;
	MobileUI.ajax.get(url).end(result_cadastroAluno);
	loadingElement('btn_solicitarCadastro', 'Cadastrando...');
	console.log(url)

	function result_cadastroAluno(error, resposta) {
		if (error) {
			alert("Verifique a sua conexão com a internet.");
			closeLoading('btn_solicitarCadastro');
			return console.log(error);
		}

		console.log(resposta);

		if(resposta.body[0].tipo == 0){
			alert({
				title:'Erro ao cadastrar',
				message: resposta.body[0].resposta,
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
			alert({
				title:'Cadastro Realizado',
				message: resposta.body[0].resposta,
				buttons:[
				{
					label: 'OK',
					onclick: function(){
						closeAlert();
					}
				}
				]
			});
		}	

		closeLoading('btn_solicitarCadastro');
		openPage('login');
	}
}