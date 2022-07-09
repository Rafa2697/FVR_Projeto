function tipo(){
	var tipo = document.getElementById("tipo").value;
	console.log(tipo);
	// document.getElementById("btn_cadTipo").style.display = 'block';

	if(tipo == 'Produto'){
		document.getElementById("tipo_text").style.display            = 'block';
		document.getElementById("tipo_text").innerHTML                = "Cadastro de Produtos";
		document.getElementById("produto_item").style.display         = 'block';
		document.getElementById("estabelecimento_item").style.display = 'none';
	}else if(tipo == 'Estabelecimento'){
		document.getElementById("tipo_text").style.display            = 'block';
		document.getElementById("tipo_text").innerHTML                = "Cadastro de Estabelecimento";
		document.getElementById("estabelecimento_item").style.display = 'block';
		document.getElementById("produto_item").style.display         = 'none';
	}
}

function cadTipos(tipo){
	var tipo = tipo;
	console.log(tipo);

	if(tipo == 'cad_produto'){
		var produto_cad     = document.getElementById("cad_produto_item").value;
		var cad_nomeProduto = document.getElementById("cad_nomeProduto_item").value;

		if(!produto_cad || produto_cad == 0){
			alert("Selecione o tipo do seu produto!");
			return false;
		}

		if(!cad_nomeProduto){
			alert("Digite o nome do seu produto!");
			return false;
		}

		var url = DEF_URL+"/cadastro_produtos.php?tipo=produto&produto="+produto_cad+"&nomeProduto="+cad_nomeProduto+"&user="+DADOS_LOGIN[0].nome+"&ra_user="+DADOS_LOGIN[0].ra;
		MobileUI.ajax.get(url).end(result_cadastrosTipos);
		loadingElement('btn_cadTipo', 'Cadastrando...');

		function result_cadastrosTipos(error, res, status) {
			console.log(res)
			if (error) {
				alert("Não foi possível cadastrar, tente novamente mais tarde ou verifique sua conexão com a internet.");
				closeLoading('btn_cadTipo')
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

				document.getElementById("cad_produto_item").value = 0;
				document.getElementById("cad_nomeProduto_item").value = '';
				closeLoading('btn_cadTipo')
			}
			
		}
	}else if(tipo == 'cad_estabelecimento'){
		var cad_nomeMercado_el  = document.getElementById("cad_nomeMercado_item_el").value;
		var cad_cidade_el       = document.getElementById("cad_cidade_item_el").value;
		var cad_bairro_el       = document.getElementById("cad_bairro_item_el").value;
		var cad_rua_el          = document.getElementById("cad_rua_item_el").value;
		var cad_numero_el       = document.getElementById("cad_numero_item_el").value;
		var cad_complemento_el  = document.getElementById("cad_complemento_item_el").value;
		var cad_tipoEL          = document.getElementById("cad_tipoEL").value;

		if(!cad_tipoEL || cad_tipoEL == 0){
			alert("Selecione o tipo do estabelecimento!")
			return false;
		}

		if(!cad_nomeMercado_el){
			alert("Digite o nome do estabelecimento!")
			return false;
		}

		if(!cad_cidade_el || cad_cidade_el == 0){
			alert("Selecione uma cidade!")
			return false;
		}

		if(!cad_bairro_el){
			alert("Digite o bairro!")
			return false;
		}

		if(!cad_rua_el){
			alert("Digite a rua!")
			return false;
		}

		if(!cad_numero_el){
			alert("Digite o número!")
			return false;
		}

		if(!cad_complemento_el){
			alert("Digite o complemento!")
			return false;
		}

		var url = DEF_URL+"/cadastro_produtos.php?tipo=estabelecimento&tipoEL="+cad_tipoEL+"&nomeMercado_el="+cad_nomeMercado_el+"&cidade_el="+cad_cidade_el+"&bairro_el="+cad_bairro_el+"&rua_el="+cad_rua_el+"&numero_el="+cad_numero_el+"&complemento_el="+cad_complemento_el+"&user="+DADOS_LOGIN[0].nome+"&ra_user="+DADOS_LOGIN[0].ra;
		MobileUI.ajax.get(url).end(result_cadEstabelecimento);
		loadingElement('btn_cadTipo', 'Cadastrando...');

		function result_cadEstabelecimento(error, res, status) {
			if (error) {
				alert("Não foi possível cadastrar, tente novamente mais tarde ou verifique sua conexão com a internet.");
				closeLoading('btn_cadTipo')
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

				document.getElementById("cad_tipoEL").value = 0;
				document.getElementById("cad_nomeMercado_item_el").value = '';
				document.getElementById("cad_cidade_item_el").value = 0;
				document.getElementById("cad_bairro_item_el").value = '';
				document.getElementById("cad_rua_item_el").value = '';
				document.getElementById("cad_numero_item_el").value = '';
				document.getElementById("cad_complemento_item_el").value = '';
				closeLoading('btn_cadTipo')
			}
			console.log(res)
		}
	}
}