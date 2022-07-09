var PRODUTOS_CAR = [];

function carrinho(){
	console.log(CARRINHO_PRODUTOS);
	var url = DEF_URL+"/produtos_carrinho.php";

	MobileUI.ajax
	.post(url)
	.send({
		produtos: CARRINHO_PRODUTOS
	})
	.end(retorno_carrinho)
	console.log(url)
	
}

function retorno_carrinho(error, res, produtos, preco) {
	if (error) {
		alert("Erro ao criar o carrinho");
		return console.log(error);
	}

	console.log(res);
	alert({
		title:'Cadastro Realizado <span style="color:green;" class="icon ion-checkmark-circled"></span>',
		message: res.body[0].res,
		buttons:[
		{
			label: 'OK',
			onclick: function(){
				closeAlert();
			}
		}
		]
	});
	backPage();
	back();
	CARRINHO_PRODUTOS.length = 0; 
}

function back(){
	backPage();
	backCat();
}

function backCat(){
	backPage();
}