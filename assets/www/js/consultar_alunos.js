var LISTA_ALUNOS = [];

function lista_alunos(){
	openPage('consultar_alunos')
	loading()
	var url = DEF_URL+"/lista_alunos.php";
	MobileUI.ajax.get(url).end(retornoListaAlunos);
}

function aprovar_aluno(id_aluno){
	loading()
	var id_aluno = id_aluno;
	var url = DEF_URL+"/aprovar_aluno.php?id_aluno="+id_aluno;
	MobileUI.ajax.get(url).end(retornoListaAlunos);
}

function reprovar_aluno(id_aluno){
	loading()
	var id_aluno = id_aluno;
	var url = DEF_URL+"/reprovar_aluno.php?id_aluno="+id_aluno;
	MobileUI.ajax.get(url).end(retornoListaAlunos);
}

function retornoListaAlunos(error, res) {
	if (error) {
		closeLoading()

		alert("Erro ao pesquisar a lista dos alunos");
		return console.log(error);
	}
	console.log(res)
	LISTA_ALUNOS.length = 0;
	var v1 = res.body;
	console.log(v1.length);
	for (i = 0; i < v1.length; i++) {
		var listaAlunos = {};
		listaAlunos.ra_aluno = res.body[i].ra;
		listaAlunos.nome_aluno = res.body[i].nome;
		listaAlunos.cpf_aluno = res.body[i].cpf;
		listaAlunos.id_aluno = res.body[i].id;
		listaAlunos.situacao_aluno = res.body[i].situacao;
		listaAlunos.color = res.body[i].color
		// if(listaAlunos.situacao == 'Aprovado'){
  //       listaAlunos.color = 'green';
  //     }

		LISTA_ALUNOS.push(listaAlunos);
	}

	closeLoading()
}

function consulta_produtosCad_alunos(){
	loading()
	var url = DEF_URL+"/consulta_produtosCad_alunos.php";
	MobileUI.ajax.get(url).end(retornoprodutosCad_alunos);
}

function retornoprodutosCad_alunos(error, res) {
	if (error) {
		closeLoading()

		alert("Erro ao pesquisar a lista dos produtos cadastrados");
		return console.log(error);
	}
	console.log(res)
	LISTA_ALUNOS.length = 0;
	var v1 = res.body;
	console.log(v1.length);
	for (i = 0; i < v1.length; i++) {
		var listaAlunos = {};
		listaAlunos.ra_aluno = res.body[i].ra;
		listaAlunos.nome_aluno = res.body[i].nome;
		listaAlunos.cpf_aluno = res.body[i].cpf;
		listaAlunos.id_aluno = res.body[i].id;
		listaAlunos.situacao_aluno = res.body[i].situacao;

		LISTA_ALUNOS.push(listaAlunos);
	}

	closeLoading()
}