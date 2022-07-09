var DEF_URL = "http://npcmobile.com.br/registro_beta";
var LISTA_EB = [];
var LISTA_CIDADES = [];
var DADOS_CIDADES = [];
var CARRINHO_PRODUTOS = [];
var ITENS = [];
var cod_cotacao = [];
var ITENS_CATEGORIAS = [];
var LISTA_ITENS_ALUNOS = [];
var LISTA_CIDADES_FILTRO = [];
var LISTA_EB_FILTRO = [];
var STATUS_COTACAO = [];
var cidade;
var mercado;
var tipo_categoria;
var cidade_filtro;
var mercado_filtro;
var arg_filtro;
var getPesquisa = localStorage.getItem("pesquisa_interesse");
var RELATORIO_MES = [];
var tipo_pesquisa = '';

$('#preco_produto').mask("#.##0,00", {reverse: true});

$('#cpf_pesquisa').mask('000.000.000-00', {reverse: false});
$('#senha').mask('00000000000', {reverse: false});

$('#tel_pesquisa').mask('(99)99999-9999', {reverse: false});

function sair() {
  alert({
    title:'Logout',
    message:'Deseja realmente sair?',
    buttons:[
    {
      label: 'SIM',
      onclick: function(){
       localStorage.removeItem('ra');
       localStorage.removeItem('senha');
       TAM_CARRINHO.length = 0;
       backPage();
       closeAlert();
     }
   },
   {
    label:'NÃO',
    onclick: function(){
      closeAlert();
    }
  }
  ]
});
}

function loading_categoria(parametro){
  console.log(parametro);
  tipo_categoria = parametro;

  carrega_cidade();
}

function carrega_cidade(){
  openPage('mercado')
  loading();
  var url = DEF_URL+"/lista_cidades.php?tipo_categoria="+tipo_categoria;
  MobileUI.ajax.get(url).end(retornoCidades);
}

function retornoCidades(error, res) {
  if (error) {
    closeLoading()

    alert("Erro ao buscar as cidades");
    return console.log(error);
  }

  console.log(res)
  LISTA_CIDADES.length = 0;
  for (i = 0; i < res.body.length; i++) {
    var cidades = {};
    cidades.id_cidade = res.body[i].id_cidade;
    cidades.nome_cidade = res.body[i].nome_cidade;
    cidades.titulo_cat = res.body[i].tipo_categoria;

    LISTA_CIDADES.push(cidades);
  }

  closeLoading()
}

function carrega_mercado(){
  cidade = document.getElementById("cidades").value;
  document.getElementById("mercado").value = 0;
  loading();
  var url = DEF_URL+"/lista_estabelecimento.php?cidade="+cidade+"&tipo_categoria="+tipo_categoria;
  console.log(url)
  MobileUI.ajax.get(url).end(retornoMercados);
}

function retornoMercados(error, res) {
  if (error) {
    closeLoading()

    alert("Erro ao buscar os mercados");
    return console.log(error);
  }
  console.log(res)
  LISTA_EB.length = 0;
  for (i = 0; i < res.body.length; i++) {
    var mercados = {};
    mercados.id_estabelecimento = res.body[i].id_estabelecimento;
    mercados.nome_estabelecimentos = res.body[i].nome_estabelecimentos;

    LISTA_EB.push(mercados);
  }

  closeLoading()
}

function dados_mercados(){
 mercado = document.getElementById("mercado").value;

 DADOS_CIDADES = [];

 vetor_cidade = {
  cidade: cidade,
  mercado: mercado
}

DADOS_CIDADES.push(vetor_cidade);
console.log(DADOS_CIDADES);
}

function itens(){
  var cidades = document.getElementById("cidades").value;
  var mercado = document.getElementById("mercado").value;

  if(cidades == 0){
    alert("Selecione uma cidade para continuar.");
    return false;
  }

  if(mercado == 0){
    alert("Selecione um mercado de para continuar.");
    return false;
  }

  openPage('cotacao');

  loading();
  var url = DEF_URL+"/lista_itens.php?tipo_categoria="+tipo_categoria;
  console.log(url)
  MobileUI.ajax.get(url).end(retornoItens);

  function retornoItens(error, res) {
    if (error) {
      closeLoading()

      alert("Erro ao buscar os itens");
      return console.log(error);
    }
    console.log(res)
    ITENS.length = 0;
    for (i = 0; i < res.body.length; i++) {
      var itens = {};
      itens.id_item = res.body[i].id_item;
      itens.nome_item = res.body[i].nome_item;

      ITENS.push(itens);
    }

    closeLoading()
  }
}

function limpa_vetor(){
  backPage();
  CARRINHO_PRODUTOS = [];
}

function categorias_cadastros(){
  openPage('cadastro_produtos')
  loading();
  var url = DEF_URL+"/categorias_cadastros.php";
  console.log(url)
  MobileUI.ajax.get(url).end(retornoCategoriasCadastros);

  function retornoCategoriasCadastros(error, res) {
    if (error) {
      closeLoading()

      alert("Erro ao buscar os itens");
      return console.log(error);
    }
    console.log(res)
    ITENS_CATEGORIAS.length = 0;
    for (i = 0; i < res.body.length; i++) {
      var itens_cat_cadastros = {};
      itens_cat_cadastros.categoria = res.body[i].categoria;

      ITENS_CATEGORIAS.push(itens_cat_cadastros);
    }

    closeLoading()
  }
}

function lista_itensProdutos_alunos(tipo){
  var tipo_lista = tipo;

  openPage('lista_itensProdutos_alunos');

  loading();
  var url = DEF_URL+"/consulta_produtosCad_alunos.php?tipo_lista="+tipo_lista;
  console.log(url)
  MobileUI.ajax.get(url).end(retornoListaItens_alunos);

  function retornoListaItens_alunos(error, res) {
    if (error) {
      closeLoading()

      alert("Erro ao buscar os itens");
      return console.log(error);
    }
    console.log(res)
    
    LISTA_ITENS_ALUNOS.length = 0;
    for (i = 0; i < res.body.length; i++) {
      var itens_lista_alunos = {};
      itens_lista_alunos.id = res.body[i].id;
      itens_lista_alunos.nome = res.body[i].nome;
      itens_lista_alunos.categoria = res.body[i].categoria;
      itens_lista_alunos.situacao = res.body[i].situacao;
      itens_lista_alunos.nome_aluno = res.body[i].nome_aluno;
      itens_lista_alunos.ra = res.body[i].ra;
      itens_lista_alunos.titulo = res.body[i].titulo;


      LISTA_ITENS_ALUNOS.push(itens_lista_alunos);
    }

    closeLoading()
  } 
}

function lista_itensMercados_alunos(tipo){
  var tipo_lista = tipo;

  openPage('lista_itensMercados_alunos');

  loading();
  var url = DEF_URL+"/consulta_mercadosCad_alunos.php?tipo_lista="+tipo_lista;
  console.log(url)
  MobileUI.ajax.get(url).end(retornoListaItensMercados_alunos);

  function retornoListaItensMercados_alunos(error, res) {
    if (error) {
      closeLoading()

      alert("Erro ao buscar os itens");
      return console.log(error);
    }
    console.log(res)
    
    LISTA_ITENS_ALUNOS.length = 0;
    for (i = 0; i < res.body.length; i++) {
      var itens_lista_alunos = {};
      itens_lista_alunos.id = res.body[i].id;
      itens_lista_alunos.nome = res.body[i].nome;
      itens_lista_alunos.cidade = res.body[i].cidade;
      itens_lista_alunos.bairro = res.body[i].bairro;
      itens_lista_alunos.rua = res.body[i].rua;
      itens_lista_alunos.numero = res.body[i].numero;
      itens_lista_alunos.complemento = res.body[i].complemento;
      itens_lista_alunos.situacao = res.body[i].situacao;
      itens_lista_alunos.ra = res.body[i].ra;
      itens_lista_alunos.titulo = res.body[i].titulo;
      itens_lista_alunos.nome_aluno = res.body[i].nome_aluno;

      LISTA_ITENS_ALUNOS.push(itens_lista_alunos);
    }

    closeLoading()
  } 
}

function lista_itensEstabelecimentos_alunos(tipo){
  var tipo_lista = tipo;

  openPage('lista_itensEstabelecimentos_alunos');
  loading();
  var url = DEF_URL+"/consulta_estabelecimentosCad_alunos.php?tipo_lista="+tipo_lista;
  console.log(url)
  MobileUI.ajax.get(url).end(retornoListaItensEstabelecimentos_alunos);

  function retornoListaItensEstabelecimentos_alunos(error, res) {
    if (error) {
      closeLoading()

      alert("Erro ao buscar os itens");
      return console.log(error);
    }
    console.log(res)
    
    LISTA_ITENS_ALUNOS.length = 0;
    for (i = 0; i < res.body.length; i++) {
      var itens_lista_alunos = {};
      itens_lista_alunos.id = res.body[i].id;
      itens_lista_alunos.nome = res.body[i].nome;
      itens_lista_alunos.categoria = res.body[i].categoria;
      itens_lista_alunos.situacao = res.body[i].situacao;
      itens_lista_alunos.nome_aluno = res.body[i].nome_aluno;
      itens_lista_alunos.ra = res.body[i].ra;
      itens_lista_alunos.titulo = res.body[i].titulo;

      LISTA_ITENS_ALUNOS.push(itens_lista_alunos);
    }

    closeLoading()
  } 
}

function aprovar_itemProduto_aluno(id_prod, tipo){
  loading();
  console.log(tipo)
  var url = DEF_URL+"/aprova_produtosCad_alunos.php?tipo_item="+tipo+"&id_prod="+id_prod;
  console.log(url)
  MobileUI.ajax.get(url).end(retornoItensProdutosAprovados_alunos);

  function retornoItensProdutosAprovados_alunos(error, res) {
   if (error) {
    closeLoading()

    alert("Erro ao buscar os itens");
    return console.log(error);
  }
  console.log(res)

  LISTA_ITENS_ALUNOS.length = 0;
  for (i = 0; i < res.body.length; i++) {
    var itens_lista_alunos = {};
    itens_lista_alunos.id = res.body[i].id;
    itens_lista_alunos.nome = res.body[i].nome;
    itens_lista_alunos.categoria = res.body[i].categoria;
    itens_lista_alunos.situacao = res.body[i].situacao;
    itens_lista_alunos.nome_aluno = res.body[i].nome_aluno;
    itens_lista_alunos.ra = res.body[i].ra;
    itens_lista_alunos.titulo = res.body[i].titulo;

    LISTA_ITENS_ALUNOS.push(itens_lista_alunos);
  }

  closeLoading()
} 
}

function reprovar_itemProduto_aluno(id_prod, tipo){
  loading();
  console.log(tipo)
  var url = DEF_URL+"/reprovar_produtosCad_alunos.php?tipo_item="+tipo+"&id_prod="+id_prod;
  console.log(url)
  MobileUI.ajax.get(url).end(retornoItensProdutosAprovados_alunos);

  function retornoItensProdutosAprovados_alunos(error, res) {
   if (error) {
    closeLoading()

    alert("Erro ao buscar os itens");
    return console.log(error);
  }
  console.log(res)

  LISTA_ITENS_ALUNOS.length = 0;
  for (i = 0; i < res.body.length; i++) {
    var itens_lista_alunos = {};
    itens_lista_alunos.id = res.body[i].id;
    itens_lista_alunos.nome = res.body[i].nome;
    itens_lista_alunos.categoria = res.body[i].categoria;
    itens_lista_alunos.situacao = res.body[i].situacao;
    itens_lista_alunos.nome_aluno = res.body[i].nome_aluno;
    itens_lista_alunos.ra = res.body[i].ra;
    itens_lista_alunos.titulo = res.body[i].titulo;

    LISTA_ITENS_ALUNOS.push(itens_lista_alunos);
  }

  closeLoading()
} 
}

function loading_categoria_filtro(arg){
  arg_filtro = arg;
  if(arg == 'SUPERMERCADO'){
    openPage('filtro_alimentos');
  }else if(arg == 'COMBUSTIVEL'){
    openPage('filtro_combustiveis');
  }
  
  loading();
  var url = DEF_URL+"/lista_cidades.php?tipo_categoria="+arg;
  MobileUI.ajax.get(url).end(retornoCidades_filtro);
}

function retornoCidades_filtro(error, res) {
  if (error) {
    closeLoading()

    alert("Erro ao buscar as cidades");
    return console.log(error);
  }

  console.log(res)
  LISTA_CIDADES_FILTRO.length = 0;
  for (i = 0; i < res.body.length; i++) {
    var cidades = {};
    cidades.id_cidade = res.body[i].id_cidade;
    cidades.nome_cidade = res.body[i].nome_cidade;
    cidades.titulo_cat = res.body[i].tipo_categoria;
    cidades.mercado = res.body[i].mercado;

    LISTA_CIDADES_FILTRO.push(cidades);
  }

  closeLoading()
}

function relatorio_mes(dt_inicio, dt_fim) {
  loading();
  openPage('media_item_mes');
  
  var dt = dt_inicio+" - "+dt_fim;
  console.log(dt)
  RELATORIO_MES = [];
  var url = DEF_URL+"/relatorio_mes.php?dt_inicio="+dt_inicio+"&dt_fim="+dt_fim;
  MobileUI.ajax.get(url).end(retornoLista_relatorioMes);
  console.log(url)
}

function retornoLista_relatorioMes(error, res) {
  if (error) {
    alert("Erro ao consultar dados");
    return console.log(error);
    closeLoading();
  }

  console.log(res);
  for (i = 0; i < res.body.length; i++) {
    var mes_relatorio = {};
    mes_relatorio.produto = res.body[i].nome_item;
    mes_relatorio.cidade = res.body[i].cidade;
    mes_relatorio.media_item = res.body[i].media_item;
    RELATORIO_MES.push(mes_relatorio);
    
  }
  // console.log(mes_relatorio.produto)
  closeLoading();
}

function filtrar_dados(tipo_cat){
  carrega_produtos_filtro(tipo_cat);
}

function gera_excel(){
  window.open(DEF_URL+"/excel.php");
}

function status_cotacao(dtIni, dtFim){
  var dataIni = dtIni;
  var dataFim = dtFim;

  loading();
  openPage('itens_status_cotacao');
  
  // var dt = dt_inicio+" - "+dt_fim;
  // console.log(dt)
  STATUS_COTACAO = [];
  var url = DEF_URL+"/status_cotacao.php?dt_inicio="+dataIni+"&dt_fim="+dataFim+"&id_aluno="+DADOS_LOGIN[0].id;
  MobileUI.ajax.get(url).end(retornoStatusCotacao);
  console.log(url)
}

function retornoStatusCotacao(error, res) {
  if (error) {
    alert("Erro ao consultar dados");
    return console.log(error);
    closeLoading();
  }

  console.log(res);
  for (i = 0; i < res.body.length; i++) {
    var status_cotacao = {};
    status_cotacao.id_cotacao = res.body[i].id_cotacao;
    status_cotacao.color = res.body[i].color;
    status_cotacao.tipo = res.body[i].tipo;
    status_cotacao.cidade = res.body[i].cidade;
    status_cotacao.mercado = res.body[i].mercado;
    status_cotacao.situacao = res.body[i].situacao;
    STATUS_COTACAO.push(status_cotacao);
  }
  // console.log(mes_relatorio.produto)
  closeLoading();
}