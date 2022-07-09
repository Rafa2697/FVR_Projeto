var ITENS_COTADOS = [];
var STATUS_ITENS = [];

function itens_cotados(id_cotacao) {
	zera_vetor2();
	loading()
	openPage('lista_itensCotados');
	var id_cotacao = id_cotacao;
	var a = {};
	a.b = id_cotacao
	cod_cotacao.push(a);
	console.log(cod_cotacao)

	var url = DEF_URL+"/itens_cotados.php?id_cotacao="+id_cotacao;
	MobileUI.ajax.get(url).end(retornoListaItensCotados);
	console.log(url)
}

function retornoListaItensCotados(error, res) {
	if (error) {
		closeLoading()

		alert("Erro ao pesquisar os itens");
		return console.log(error);
	}
	console.log(res)
	ITENS_COTADOS.length = 0;
	var v1 = res.body;
	console.log(v1.length);
	for (i = 0; i < v1.length; i++) {
		var itensCotados = {};
		itensCotados.nome_item = res.body[i].nome_item;
		itensCotados.preco_item = res.body[i].preco_item;

		ITENS_COTADOS.push(itensCotados);
	}

	closeLoading();
}

function cotacao_aprovada(argumento_aprovado){
	var argumento_aprovado = argumento_aprovado;

	var url = DEF_URL+"/status_itens.php?cotacaoAR="+argumento_aprovado+"&tipo=Aprovado&categoria="+tipo_pesquisa;
	MobileUI.ajax.get(url).end(retornoListaCotacao);
	console.log(url)
	backPage();
	LISTA_COTACAO = [];
	ITENS_COTADOS = [];
	cod_cotacao = [];
	// lista_cotacoes();
}

function cotacao_reprova(argumento_reprovado){
	var argumento_reprovado = argumento_reprovado;

	var url = DEF_URL+"/status_itensBloqueado.php?cotacaoAR="+argumento_reprovado+"&tipo=Bloqueado&categoria="+tipo_pesquisa;
	MobileUI.ajax.get(url).end(retornoListaCotacao);
	console.log(url)
	backPage();
	LISTA_COTACAO = [];
	ITENS_COTADOS = [];
	cod_cotacao = [];
	// lista_cotacoes();
}

function zera_vetor(){
	backPage();
	cod_cotacao = [];
	console.log('zerou')
}

function zera_vetor2(){
	// backPage();
	cod_cotacao = [];
	console.log('zerou2')
}

function view_itens_alunos(id_cotacao){
	zera_vetor2();
	loading()
	openPage('view_itens_alunos');
	var id_cotacao = id_cotacao;
	var a = {};
	a.b = id_cotacao
	cod_cotacao.push(a);
	console.log(cod_cotacao)

	var url = DEF_URL+"/itens_cotados.php?id_cotacao="+id_cotacao;
	MobileUI.ajax.get(url).end(retornoListaItensCotados);
	console.log(url)
}

function retornoListaItensCotados(error, res) {
	if (error) {
		closeLoading()

		alert("Erro ao pesquisar os itens");
		return console.log(error);
	}
	console.log(res)
	ITENS_COTADOS.length = 0;
	var v1 = res.body;
	console.log(v1.length);
	for (i = 0; i < v1.length; i++) {
		var itensCotados = {};
		itensCotados.nome_item = res.body[i].nome_item;
		itensCotados.preco_item = res.body[i].preco_item;

		ITENS_COTADOS.push(itensCotados);
	}

	closeLoading();
}