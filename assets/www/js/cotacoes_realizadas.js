var COTACOES_REALIZADAS = [];

function cotacoes_realizadas(){
  openPage('cotacoes_realizadas')
  // loading();
  var url = DEF_URL+"/cotacoes_realizadas.php";
  console.log(url)
  MobileUI.ajax.get(url).end(retornoCotacoesRealizadas);

  function retornoCotacoesRealizadas(error, res) {
    if (error) {
      // closeLoading()

      alert("Erro ao buscar os alunos");
      return console.log(error);
    }
    console.log(res)
    COTACOES_REALIZADAS.length = 0;
    for (i = 0; i < res.body.length; i++) {
      var dados_alunos = {};
      dados_alunos.id_aluno = res.body[i].id_aluno;
      dados_alunos.nome_aluno = res.body[i].nome_aluno;
      dados_alunos.ra_aluno = res.body[i].ra_aluno;
      dados_alunos.cpf_aluno = res.body[i].cpf_aluno;

      COTACOES_REALIZADAS.push(dados_alunos);
    }

    // closeLoading()
  }
}