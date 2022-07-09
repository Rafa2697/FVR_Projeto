var dt_ini2 = '';
var dt_fim2 = '';
var tipo;
var RELATORIO_ANALISTAS = [];

function relatorio_mes_analistas(dt_ini, dt_fim) {
	dt_ini2 = dt_ini;
	dt_fim2 = dt_fim;

	console.log(dt_ini2)
	console.log(dt_fim2)

	openPage('categoria_relatorio');
}

function relatorio_analistas(tipo){
	console.log(tipo);

	openPage('view_relatorio_analistas');

	// var url = DEF_URL+"/relatorio_analistas.php";

	var url = DEF_URL+"/relatorio_analistas.php?dt_ini="+dt_ini2+"&dt_fim="+dt_fim2+"&tipo="+tipo;
	MobileUI.ajax.get(url).end(retorno_relatorio);

	console.log(url)
	console.log(dt_ini2)
	console.log(dt_fim2)
	console.log(tipo)
}

function retorno_relatorio(error, res){
	if (error) {
		alert("Ops, houve um erro na consulta dos dados, tente novamente mais tarde.");
		return console.log(error);
	}

	console.log(res);

	RELATORIO_ANALISTAS.length = 0;

	var relatorio = {};
	relatorio.titulo = res.body[0].titulo;
	relatorio.mes_relatorio = res.body[0].mes_relatorio;
	relatorio.setor = res.body[0].setor;
	relatorio.introducao = res.body[0].introducao;
	relatorio.cotacao = res.body[0].cotacao;
	relatorio.img_grafico_cotacao = res.body[0].img_grafico_cotacao;
	relatorio.fonte_grafico_cotacao = res.body[0].fonte_grafico_cotacao;
	relatorio.consideracoes = res.body[0].consideracoes
	relatorio.links_fontes = res.body[0].links_fontes
	relatorio.creditos_coordenador = res.body[0].creditos_coordenador
	relatorio.credito_analistas = res.body[0].credito_analistas
	relatorio.creditos_desenvolvedor = res.body[0].creditos_desenvolvedor
	relatorio.creditos_documentacao = res.body[0].creditos_documentacao
	relatorio.link_podcast = res.body[0].link_podcast
	relatorio.arquivo = res.body[0].arquivo

	RELATORIO_ANALISTAS.push(relatorio);

}