var CARRINHO_PRODUTOS = [];
var TAM_CARRINHO = [];

function add_produto() {
	var preco_produto = document.getElementById("preco_produto").value;
	var produto = document.getElementById("produto").value;

	if(!preco_produto){
		alert("Para adicionar é necessario preencher o valor do produto.");
		return false;
	}

	if(preco_produto.length <= 2){
		alert("Digite os centavos.");
		return false;
	}

	if(produto == 0){
		alert("Para adicionar é necessario selecionar um produto.");
		return false;
	}

	var produto = document.getElementById("produto").value;
	var preco   = document.getElementById("preco_produto").value;

	TAM_CARRINHO = [];
	var vetor_tam_carrinho = {
		tamanho_carrinho: CARRINHO_PRODUTOS.length+1
	}

	TAM_CARRINHO.push(vetor_tam_carrinho)
	console.log(TAM_CARRINHO)

	var vetor_produto = {
		produto: produto,
		preco: preco,
		cidade: cidade,
		mercado: mercado,
		nome_aluno:DADOS_LOGIN[0].nome,
		id_user:DADOS_LOGIN[0].id,
		tipo_categoria:tipo_categoria
	};

	CARRINHO_PRODUTOS.push(vetor_produto);
	console.log(CARRINHO_PRODUTOS)

	console.log(produto)
	$("#produto option[value='"+produto+"']").remove();

	var produto = document.getElementById("produto").value = 0;
	var preco   = document.getElementById("preco_produto").value = "";

}

function excluirProduto(index) {
	CARRINHO_PRODUTOS.splice(index, 1);

	TAM_CARRINHO = [];
	var vetor_tam_carrinho = {
		tamanho_carrinho: CARRINHO_PRODUTOS.length
	}
	TAM_CARRINHO.push(vetor_tam_carrinho)
	console.log(TAM_CARRINHO)
}