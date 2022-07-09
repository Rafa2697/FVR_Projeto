var DATA_PRODUTOS = [];
var DATA_ALL_PRODUTOS =[];

function carrega_produtos(tipo_cat) {
	DADOS_FILTRO.length = 0;
	openPage('lista_alimentos');
	var date_now = new Date();
	var mes_now1 = date_now.getMonth()+1;
	var mes_now2 = (mes_now1 < 10 ? '0' : '') + mes_now1;
	var ano_now = date_now.getFullYear();
	
	var tipo_cat = tipo_cat;
	console.log(tipo_cat)
	DATA_PRODUTOS = [];
	var url = DEF_URL+"/dados_alimentos.php?tipo_cat="+tipo_cat+"&mes="+mes_now2+"&ano="+ano_now;
	MobileUI.ajax.get(url).end(retornoLista);
	console.log(url)
}

function retornoLista(error, res) {
	if (error) {
		alert("Erro ao consultar dados dos alimentos");
		return console.log(error);
	}

	console.log(res);
	for (i = 0; i < res.body.length; i++) {
		var alimentos = {};
		alimentos.produto = res.body[i].nome_item;
		alimentos.cidade = res.body[i].cidade;
		// alimentos.mercado = res.body[i].mercado;
		alimentos.media_item = res.body[i].media_item;
		DATA_PRODUTOS.push(alimentos);
		
	}
	console.log(alimentos.produto);
}

function carrega_all_produtos() {
	VETOR.length = 0;
	CART.length = 0;
	COUNT_ITEM.length = 0;
	DADOS_FILTRO.length = 0;
	openPage('minha_cotacao');
	var date_now = new Date();
	var mes_now1 = date_now.getMonth()+1;
	var mes_now2 = (mes_now1 < 10 ? '0' : '') + mes_now1;
	var ano_now = date_now.getFullYear();
	
	var tipo_cat = tipo_cat;
	console.log(tipo_cat)
	DATA_ALL_PRODUTOS = [];
	var url = DEF_URL+"/dados_alimentos.php?tipo_cat=all&mes="+mes_now2+"&ano="+ano_now;
	MobileUI.ajax.get(url).end(retorno_all_produtos);
	console.log(url)
}

function retorno_all_produtos(error, res) {
	if (error) {
		alert("Erro ao consultar dados dos alimentos");
		return console.log(error);
	}

	console.log(res);
	for (i = 0; i < res.body.length; i++) {
		var alimentos = {};
		alimentos.produto = res.body[i].nome_item;
		alimentos.cidade = res.body[i].cidade;
		// alimentos.mercado = res.body[i].mercado;
		alimentos.media_item = res.body[i].media_item;
		DATA_ALL_PRODUTOS.push(alimentos);
		
	}
	console.log(alimentos.produto);
}