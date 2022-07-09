var VETOR = [];
var CART = [];
var COUNT_ITEM = [];
var total_all = [];
var TOTAL_CARRINHO = [];
var soma = 0;

function count_up(nome_prod){
	var nome_id = 'item'+nome_prod;

	var count_prod = {};
	count_prod.nome_prod = nome_prod;
	count_prod.quantidade = 0;
	COUNT_ITEM.push(count_prod);
	console.log(COUNT_ITEM)

	for(var item in COUNT_ITEM) {
		if(COUNT_ITEM[item].nome_prod === nome_prod) {
			COUNT_ITEM[item].quantidade ++;
			document.getElementById(nome_id).innerHTML = COUNT_ITEM[item].quantidade
			return;
		}
	}
	
}

function count_down(nome_prod){
	var nome_id = 'item'+nome_prod;
	console.log(nome_prod)
	for(var item in COUNT_ITEM) {
		if(COUNT_ITEM[item].nome_prod === nome_prod) {
			COUNT_ITEM[item].quantidade --;
			document.getElementById(nome_id).innerHTML = COUNT_ITEM[item].quantidade
			return;
		}

		if(COUNT_ITEM[item].quantidade == 0){
			 VETOR.splice(nome_prod, 1);
		}
	}
	
}

function add_cart(nome_prod, media_prod, index){
	for(var item in VETOR) {
		if(VETOR[item].nome_prod === nome_prod) {
			VETOR[item].quantidade ++;
			VETOR[item].total = Number(VETOR[item].quantidade * VETOR[item].media_prod).toFixed(2);
			VETOR[item].media_prod = media_prod;
			return;
		}
	}
	var alimentos = {};
	alimentos.nome_prod = nome_prod;
	alimentos.media_prod = media_prod;
	alimentos.quantidade = 1;
	alimentos.total = media_prod;
	VETOR.push(alimentos);
}

function remove_cart(nome_prod){
	for(var item in VETOR) {
		if(VETOR[item].nome_prod === nome_prod) {
			VETOR[item].quantidade --;
			VETOR[item].total = Number(VETOR[item].quantidade * VETOR[item].media_prod).toFixed(2);
			return;
		}
	}
}

function btn_finalizar(){
	soma = 0;
	console.log(VETOR);
	for (var i=0; i<VETOR.length; i++){
		total_all[i] = parseFloat(VETOR[i].total);
		soma += parseFloat(total_all[i]);
	}
	soma = soma.toFixed(2);

	// TOTAL_CARRINHO.length = 0;
	// TOTAL_CARRINHO = [];

	var total_prod = {};
	total_prod.total_all = soma.replace(".", ",");
	TOTAL_CARRINHO.push(total_prod);

	console.log("resultado => "+soma);
	openPage('carrinho_usuarios');
}

