var LISTA_COTACAO = [];
var tipo;
var PESQUISA_COTACAO = [];

function lista_cotacoes(tipo_cat) {
	loading()
	// zera_vetor();
	tipo_pesquisa = tipo_cat;
	console.log("tipo_pesquisa=>"+tipo_pesquisa)
	openPage('consultar_cotacao');

	var tipo_cat = tipo_cat;

	var url = DEF_URL+"/lista_cotacao.php?tipo_cat="+tipo_cat;
	MobileUI.ajax.get(url).end(retornoListaCotacao);
}

function retornoListaCotacao(error, res) {
	if (error) {
		alert("Erro ao pesquisar a lista as cotações");
		return console.log(error);
	}

	console.log(res)
	LISTA_COTACAO.length = 0;
	LISTA_COTACAO = [];
	for (i = 0; i < res.body.length; i++) {
		var lista_cotacao = {};
		lista_cotacao.nome_aluno = res.body[i].nome_aluno;
		lista_cotacao.data = res.body[i].data;
		lista_cotacao.cidade = res.body[i].cidade;
		lista_cotacao.mercado = res.body[i].mercado;
		lista_cotacao.id_cotacao = res.body[i].id_cotacao;

		LISTA_COTACAO.push(lista_cotacao);
	}

	closeLoading();
}

function busca_cotacoes(parametro) {
	// var inputPage = parametro;
	// console.log(parametro)
	PESQUISA_COTACAO.length = 0;
	openPage('pesquisa_cotacoes');
	tipo = parametro;
	// tipo = parametro;
}

function search_cotacoes() {
	// loading()
	console.log(tipo)
	var nome_aluno = document.getElementById("pesquisa_dados").value;
	console.log(nome_aluno)
	var url = DEF_URL+"/pesquisa_cotacao.php?tipo_cat="+tipo+"&nome_aluno="+nome_aluno;
	MobileUI.ajax.get(url).end(retornoPesquisaCotacoes);
}

function retornoPesquisaCotacoes(error, res) {
	console.log(res);
	if (error) {
		function openToastRed() {
			openToast({
				message: 'Erro na pesquisa, entre em contato com o responsável.',
				class: 'red radius-big'
			})
		}
		return console.log(error);
	}
	PESQUISA_COTACAO.length = 0;
	for (i = 0; i < res.body.length; i++) {
		var pesquisa = {};
		pesquisa.nome_aluno = res.body[i].nome_aluno;
		pesquisa.data = res.body[i].data;
		pesquisa.cidade = res.body[i].cidade;
		pesquisa.mercado = res.body[i].mercado;
		pesquisa.id_cotacao = res.body[i].id_cotacao;

		PESQUISA_COTACAO.push(pesquisa);
	}
}