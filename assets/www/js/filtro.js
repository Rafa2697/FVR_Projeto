var DADOS_FILTRO = [];
var LISTA_MERCADOS_FILTRO = [];

function search_dados(dados){
	
	console.log(DADOS_FILTRO)
	if(dados == "COMBUSTIVEL"){
		var search = document.getElementById("select_cidade_combustiveis").value;
		console.log(dados)
		var url = DEF_URL+"/dados_filtro.php?tipo_cat="+dados+"&search="+search;
		MobileUI.ajax.get(url).end(retornoApiFiltro);
		console.log(url)

		// CHANGE CIDADE
		loading();
		var url = DEF_URL+"/lista_mercados_filtro.php?cidade="+search+"&categoria="+dados;
		MobileUI.ajax.get(url).end(retornoMercados_filtro);
		console.log(url);

		function retornoMercados_filtro(error, res) {
			if (error) {
				closeLoading()

				alert("Erro ao buscar as cidades");
				return console.log(error);
			}

			console.log(res)
			LISTA_MERCADOS_FILTRO.length = 0;
			for (i = 0; i < res.body.length; i++) {
				var cidades = {};
				// cidades.id_cidade = res.body[i].id_cidade;
				// cidades.nome_cidade = res.body[i].nome_cidade;
				// cidades.titulo_cat = res.body[i].tipo_categoria;
				cidades.mercado = res.body[i].mercado;

				LISTA_MERCADOS_FILTRO.push(cidades);
			}

			closeLoading()
		}

		DADOS_FILTRO = [];
	}else if(dados == "SUPERMERCADO"){
		var search = document.getElementById("select_cidade_mercados").value;
		console.log(dados)
		var url = DEF_URL+"/dados_filtro.php?tipo_cat="+dados+"&search="+search;
		MobileUI.ajax.get(url).end(retornoApiFiltro);
		console.log(url);

		// CHANGE CIDADE
		loading();
		var url = DEF_URL+"/lista_mercados_filtro.php?cidade="+search+"&categoria="+dados;
		MobileUI.ajax.get(url).end(retornoMercados_filtro);
		console.log(url);

		function retornoMercados_filtro(error, res) {
			if (error) {
				closeLoading()

				alert("Erro ao buscar as cidades");
				return console.log(error);
			}

			console.log(res)
			LISTA_MERCADOS_FILTRO.length = 0;
			for (i = 0; i < res.body.length; i++) {
				var cidades = {};
				// cidades.id_cidade = res.body[i].id_cidade;
				// cidades.nome_cidade = res.body[i].nome_cidade;
				// cidades.titulo_cat = res.body[i].tipo_categoria;
				cidades.mercado = res.body[i].mercado;

				LISTA_MERCADOS_FILTRO.push(cidades);
				console.log(LISTA_MERCADOS_FILTRO)
			}

			closeLoading()
		}
		DADOS_FILTRO = [];
	}
}

function search_dados_v2(dados){
	
	console.log(DADOS_FILTRO)
	if(dados == "COMBUSTIVEL"){
		var search = document.getElementById("select_cidade_combustiveis").value;
		var mercado = document.getElementById("select_cidade_combustiveisv2").value;
		console.log(dados)
		var url = DEF_URL+"/dados_v2.php?tipo_cat="+dados+"&search="+search+"&mercado="+mercado;
		MobileUI.ajax.get(url).end(retornoApiFiltro);
		console.log(url)
		DADOS_FILTRO = [];
	}else if(dados == "SUPERMERCADO"){
		var search = document.getElementById("select_cidade_mercados").value;
		var mercado = document.getElementById("select_cidade_mercadosv2").value;
		console.log(dados)
		var url = DEF_URL+"/dados_v2.php?tipo_cat="+dados+"&search="+search+"&mercado="+mercado;
		MobileUI.ajax.get(url).end(retornoApiFiltro);
		console.log(url)
		DADOS_FILTRO = [];

	}
}

function retornoApiFiltro(error, res) {

	if (error) {
		alert("Erro ao consultar, tente novamento mais tarde.");
		document.getElementById("pesquisa_dados").value = "";
		return console.log(error);
	}

	console.log(res);
	for (i = 0; i < res.body.length; i++) {
		var filtro = {};
		filtro.nome_item = res.body[i].nome_item;
		filtro.preco_item = res.body[i].preco_item;
		filtro.cidade = res.body[i].cidade;
		filtro.mercado = res.body[i].mercado;

		DADOS_FILTRO.push(filtro);
	}
}