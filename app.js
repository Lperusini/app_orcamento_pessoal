class Despesa {

	constructor(ano, mes, dia, tipo, descricao, valor) {

		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor

	}

	validarDados() {

		for(let i in this) {
			if (this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}

		return true

	}
}

class Bd {

	constructor() {

		let id = localStorage.getItem('id')//recupera um dado dentro do local Storage

		if(id === null) {//inicializa a id na primeira vez, que não há um id pre-existente
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {

		let proximoId = localStorage.getItem('id')//recupera um dado dentro do local Storage

		return parseInt(proximoId) + 1
	}

	gravar(d) {//d de despesa

		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))//reload de html com cntr+f5

		localStorage.setItem('id', id)

	}

	recuperarTodosRegistros() {

		console.log('iniciar recuperou' )

		//araay de despesas
		let despesas = Array()

		let id = localStorage.getItem('id')

		//recupera todas as despesas cadastradas em LS
		for (let i = 1; i <= id; i++) {

			//recuperar a despesa
			let despesa = JSON.parse(localStorage.getItem(i))//recupera a string de JSON e converte 

			//verifica se tem indice null (apagado)
			if(despesa === null) {
				continue

			} 

			despesa.id = i

			despesas.push(despesa)//pega o item  e joga no array despesas

		}

			return despesas

	}	


	remover(id) {

		localStorage.removeItem(id)
	}



	pesquisar(despesa) {

		//console.log(despesa)
		let despesasFiltradas = Array()

		despesasFiltradas = this.recuperarTodosRegistros()

		console.log(despesasFiltradas)

		//filtro de ano
		if(despesa.ano != '') {
		//console.log(despesasFiltradas.filter(d => d.ano == despesa.ano))
		console.log('filtro de ano')
		despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}

		//filtro de mes
		if(despesa.mes != '') {
		//console.log(despesasFiltradas.filter(d => d.ano == despesa.ano))
		console.log('filtro de mes')
		despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}

		//filtro de dia
		if(despesa.dia != '') {
		//console.log(despesasFiltradas.filter(d => d.ano == despesa.ano))
		console.log('filtro de dia')
		despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

		//filtro de tipo
		if(despesa.tipo != '') {
		//console.log(despesasFiltradas.filter(d => d.ano == despesa.ano))
		console.log('filtro de tipo')
		despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}

		//filtro de descrição
		if(despesa.descricao != '') {
		//console.log(despesasFiltradas.filter(d => d.ano == despesa.ano))
		console.log('filtro de descricao')
		despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		//filtro de valor
		if(despesa.valor != '') {
		//console.log(despesasFiltradas.filter(d => d.ano == despesa.ano))
		console.log('filtro de valor')
		despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}

		console.log(despesasFiltradas)

		return despesasFiltradas

	}

}

let bd = new Bd()//instanciando a classe


function cadastrarDespesa() {

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	//console.log(ano.value, mes.value)

	let despesa = new Despesa(

		ano.value, 
		mes.value, 
		dia.value, 
		tipo.value, 
		descricao.value, 
		valor.value
	)

	if(despesa.validarDados()) {

		bd.gravar(despesa)

		document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso.'
		document.getElementById('modal_button').innerHTML = 'Voltar'
		document.getElementById('modal_button').className = 'btn btn-success'

		$('#modalRegistraDespesa').modal('show')//comando jquery

		//limpar o formulario apos a gravação
		ano.value = ''
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''

	} else {

		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação. Verifique se os dados foram cadastrados corretamente'
		document.getElementById('modal_button').innerHTML = 'Voltar e corrigir'
		document.getElementById('modal_button').className = 'btn btn-danger'

		$('#modalRegistraDespesa').modal('show')//comando jquery

	}

	
}


function carregaListaDespesas(despesas = Array(), filtro = false) {

	if(despesas.length == 0 && filtro == false){

	despesas = bd.recuperarTodosRegistros()

	}

//	console.log(despesas)

	//seleciona o elemento tbody 
	let listaDespesas = document.getElementById('listaDespesas')
	listaDespesas.innerHTML = ''//limpa a tabela antes de mostrar os resultados


//	console.log(listaDespesas)

    //percorrer o array despesas
    despesas.forEach(function (d) {
    	

    	//criando a linha (tr)
    	let linha = listaDespesas.insertRow()

    	//criar as colunas (td)
    	linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

    	//ajuste de tipo
    	switch(d.tipo) {
    		case '1': d.tipo = 'Alimentação'
    			break
    		case '2': d.tipo = 'Educação'
    			break
    		case '3': d.tipo = 'Lazer'
    			break
    		case '4': d.tipo = 'Saúde'
    			break
    		case '5': d.tipo = 'Transporte'
    			break
    	}


    	linha.insertCell(1).innerHTML = d.tipo
    	linha.insertCell(2).innerHTML = d.descricao
    	linha.insertCell(3).innerHTML = d.valor

    	/*criar o botao de exclusão de registros*/
    	let btn = document.createElement("button")
    	btn.className = 'btn btn-danger'
    	btn.innerHTML = '<i class="fas fa-times"></>'
    	btn.id = `id_despesa_${d.id}`//o proprio botao associa o id do registro a ele
    	btn.onclick = function() {
    		//alert('remover despesa') debug 1
    		

    		let id = this.id.replace('id_despesa_', '')//tira a string e mantem o indice do LS

    		//alert(id) 

    		bd.remover(id)

    		window.location.reload()//recarrega a pagina para atualizar a remoção do html


    	}

    	linha.insertCell(4).append(btn)

    	console.log(d)

    })
	
}

function pesquisarDespesa(){
	//console.log('pesquisa')

	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

	//console.log(despesa)

	let despesas = bd.pesquisar(despesa)

	this.carregaListaDespesas(despesas, true)
	
}












